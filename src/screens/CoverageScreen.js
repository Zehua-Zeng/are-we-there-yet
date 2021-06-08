import React, { useState, useEffect } from 'react';
// styled components
import styled from 'styled-components';
// components
import {
    SearchBar,
    CoverageFilter,
    CoverageContainer,
    PapersSection,
} from '../components';
// local data (can be removed after backend is built)
import coverages from '../resources/data/coverages.json';

const StyledCoverageScreen = styled.div`
    height: calc(100vh - 10rem);
    width: calc(100vw - 8rem);
    margin: 1.2rem 4rem !important;

    .container-flex {
        display: flex;
        justify-content: space-between;
    }
`;

const CoverageScreen = () => {
    const [selectedTasks, setSelectedTasks] = useState([]);
    const [paperType, setPaperType] = useState([]);
    const [selectedPapers, setSelectedPapers] = useState({});
    const [filteredSelectedPapers, setFilteredSelectedPapers] = useState([]);
    const [filterData, setFilterData] = useState(undefined);
    const [searchQuery, setSearchQuery] = useState('');

    // data used to display coverage table
    const [data, setData] = useState({
        authors: [],
        tasks: [],
        coverages: {
            '1-encoding': {},
            '2-encoding': {},
            '3-encoding': {},
        },
    });

    // object wuth file names as keys, abstracted paper data (objects) as values
    const [abstractedPaperData, setAbstracatedPaperData] = useState({});

    // add tag only if it is not added yet
    let addSelectedTasks = (tag) => {
        if (!selectedTasks.includes(tag)) {
            setSelectedTasks([...selectedTasks, tag]);
        }
    };

    let deleteSelectedTasks = (value) => {
        let temp = selectedTasks.filter((e) => e !== value);
        setSelectedTasks(temp);
    };

    var parsed_coverages = JSON.parse(JSON.stringify(coverages));

    // helper: add to or remove from paper list
    const modifySelectedPapers = (mode, arr) => {
        let updated_papers = JSON.parse(JSON.stringify(selectedPapers));
        for (var str of arr) {
            if (
                selectedPapers[str] !== undefined &&
                selectedPapers[str] !== 0
            ) {
                if (mode) {
                    updated_papers[str] += 1;
                } else {
                    updated_papers[str] -= 1;
                    if (updated_papers[str] === 0) {
                        delete updated_papers[str];
                    }
                }
            } else {
                if (mode) {
                    updated_papers[str] = 1;
                } else {
                    console.log(`Error: can not remove non-existing paper`);
                }
            }
        }
        setSelectedPapers(updated_papers);
        // selectedDetails = Object.keys(selectedPapers);
    };

    const updateFilteredSelectedPaper = () => {
        // filter to get displayable selected paper
        if (filterData !== undefined ) {
            let new_filtered_data = [];
            for (let paper in selectedPapers) {
                // console.log('filtering selected papers:');
                // console.log(Object.keys(filterData));
                // console.log(paper);
                // console.log(filteredSelectedPapers);
                if (Object.keys(filterData).includes(paper) && !new_filtered_data.includes(paper)) {
                    new_filtered_data.push(paper);
                }
            }
            setFilteredSelectedPapers(new_filtered_data);
        } else {
            setFilteredSelectedPapers(Object.keys(selectedPapers));
        }
    }

    // helper function that turns one array into n* of its contents
    const duplicateArr = (arr, times) =>
        Array(times)
            .fill([...arr])
            .reduce((a, b) => a.concat(b));

    // map channel name to its abbreviation
    let channel_map = {
        positionX: 'PX',
        positionY: 'PY',
        length: 'L',
        angle: 'AN',
        area: 'AR',
        texture: 'T',
        volume: 'V',
        density: 'D',
        shape: 'S',
        'color-saturation': 'CS',
        'color-hue': 'CH',
        orentation: 'O',
    };

    // directly effects the display of the coverage matrix
    let encodingTypes = [
        'PX',
        'PY',
        'L',
        'AN',
        'AR',
        'T',
        'V',
        'D',
        'S',
        'CS',
        'CH',
        'O',
    ];

    let encoding_counts = ['1-encoding', '2-encoding', '3-encoding'];

    // huge chunk of function that aggregate necessary data for coverage page
    let getCoverages = () => {
        let source = parsed_coverages;
        if (filterData !== undefined) {
            source = filterData;
        }
        let new_data = {
            authors: [],
            tasks: [],
            coverages: {
                '1-encoding': {},
                '2-encoding': {},
                '3-encoding': {},
            },
        };
        for (let c in source) {
            // aggregate tasks
            let tasks = [];
            for (var t of source[c].Tasks) {
                let processed_task = t.replace(/-\d+$/, '');
                if (!new_data.tasks.includes(processed_task))
                    new_data.tasks.push(processed_task);
                if (!tasks.includes(processed_task)) tasks.push(processed_task);
            }

            let designs = source[c]['Covered Designs'];
            // read into each layer of covered designs and populate coverage
            for (var id in designs) {
                for (var layer of designs[id].layers) {
                    // gather data of encodings within each layer
                    let count_encodings = layer['encodings'].length;
                    let encoding_formats = [];
                    // encodings
                    for (var e of layer['encodings']) {
                        let len = encoding_formats.length;
                        if (len > 0) {
                            // duplicate string array to create all possible combinations
                            if (e['channels'].length > 1) {
                                encoding_formats = duplicateArr(
                                    encoding_formats,
                                    e['channels'].length
                                );
                            }

                            let count = 0;
                            // append each channel to encoding formats
                            for (var channel of e['channels']) {
                                for (
                                    var i = count * len;
                                    i < count * len + len;
                                    i++
                                ) {
                                    encoding_formats[i].push(
                                        channel_map[channel]
                                    );
                                }
                                count++;
                            }
                        } else {
                            for (let c2 of e['channels']) {
                                let new_format = [];
                                new_format.push(channel_map[c2]);
                                encoding_formats.push(new_format);
                            }
                        }
                    }

                    // process encoding_formats from 2D array to array of strings
                    let encoding_strs = [];
                    for (var f of encoding_formats) {
                        // sort string by its index within encodingTypes
                        f.sort((a, b) => {
                            let ia = encodingTypes.indexOf(a);
                            let ib = encodingTypes.indexOf(b);
                            return ia - ib;
                        });
                        let str = '';
                        for (var fs of f) {
                            str += fs;
                        }
                        encoding_strs.push(str);
                    }

                    // place data to desired position
                    for (var e_s of encoding_strs) {
                        // create object structure for encoding combination that does not exist yet
                        if (
                            new_data['coverages'][
                                encoding_counts[count_encodings - 1]
                            ][e_s] === undefined
                        ) {
                            new_data['coverages'][
                                encoding_counts[count_encodings - 1]
                            ][e_s] = {
                                category: '',
                                data: undefined,
                            };
                        }
                        // if no category exists, set it to the category of current paper
                        if (
                            new_data['coverages'][
                                encoding_counts[count_encodings - 1]
                            ][e_s]['category'].localeCompare('') === 0
                        ) {
                            new_data['coverages'][
                                encoding_counts[count_encodings - 1]
                            ][e_s]['category'] = source[c].Category;
                            // otherwise, if different category is added to the object, set category to Hybrid
                        } else if (
                            new_data['coverages'][
                                encoding_counts[count_encodings - 1]
                            ][e_s]['category'].localeCompare(
                                source[c].Category
                            ) !== 0
                        ) {
                            new_data['coverages'][
                                encoding_counts[count_encodings - 1]
                            ][e_s]['category'] = 'Hybrid';
                        }
                        // record paper id to such encoding
                        if (
                            new_data['coverages'][
                                encoding_counts[count_encodings - 1]
                            ][e_s]['data'] === undefined
                        ) {
                            new_data['coverages'][
                                encoding_counts[count_encodings - 1]
                            ][e_s]['data'] = [c];
                        } else if (
                            !new_data['coverages'][
                                encoding_counts[count_encodings - 1]
                            ][e_s]['data'].includes(c)
                        ) {
                            new_data['coverages'][
                                encoding_counts[count_encodings - 1]
                            ][e_s]['data'].push(c);
                        }
                    }
                }
            }
        }

        setData(new_data);
    };

    let filter = () => {
        // if no filters applied
        if (searchQuery.length === 0 && paperType.length === 0 && selectedTasks.length === 0) {
            setFilterData(undefined);
        } else {
            let res = {};
            for (let paper in parsed_coverages) {
                if (filterHelper(paper)){
                    res[paper] = parsed_coverages[paper];
                } 
            }
            setFilterData(res);
        }
       
    };

    let filterHelper = (paper) => {
        if (searchQuery.length > 0 && !parsed_coverages[paper].Title
            .toLowerCase()
            .includes(searchQuery.toLowerCase())){
                return false;
        }
        if (paperType.length > 0 && !paperType.includes(parsed_coverages[paper].Category)){
            return false;
        }
        // a paper is considered within filter if it includes one or more selected tasks
        if (selectedTasks.length > 0 && parsed_coverages[paper].Tasks.length > 0) {
            for (const taskVal of parsed_coverages[paper].Tasks) {
                let t = taskVal.replace(/-\d+$/, '');
                if (selectedTasks.includes(t)) {
                    return true;
                }
            }
        } else {
            return true;
        }
        return false;
    };

    // Search articles by title
    const searchByTitle = (value) => {
        let trimmed = value.trim();
        if (trimmed.length !== 0) {
            setSearchQuery(trimmed);
        }
    };

    const searchByPaperType = (paperidx) => {
        let curPaperType = 'Experiment';
        if (paperidx === 1) curPaperType = 'Theory';
        if (paperidx === 2) curPaperType = 'Hybrid';
        let temp = [...paperType];
        const index = temp.indexOf(curPaperType);
        if (index > -1) {
            temp.splice(index, 1);
        } else {
            temp.push(curPaperType);
        }
        setPaperType(temp);
    };

    useEffect(() => {
        let new_abstracted_data =  {};
        for (let c in parsed_coverages) {
            // aggregate tasks
            let tasks = [];
            for (let t of parsed_coverages[c].Tasks) {
                let processed_task = t.replace(/-\d+$/, '');
                if (!data.tasks.includes(processed_task))
                    data.tasks.push(processed_task);
                if (!tasks.includes(processed_task)) tasks.push(processed_task);
            }
            // aggregate abstracted paper data
            new_abstracted_data[c] = {
                category: parsed_coverages[c].Category,
                title: parsed_coverages[c].Title,
                tasks: tasks,
                ranked:
                    Object.keys(parsed_coverages[c].Results.Experimental)
                        .length > 0 ||
                    Object.keys(parsed_coverages[c].Results.Theoretical)
                        .length > 0,
            };
        }
        console.log(`Abstracted paper data:`);
        console.log( new_abstracted_data);
        setAbstracatedPaperData(new_abstracted_data);
        getCoverages();
        console.log('Formatted data at useEffect[]:');
        console.log(data)

    }, []);

    //get most update filter data based on task
    useEffect(() => {
        console.log('Selected task in useEffect');
        console.log(selectedTasks);
        filter();
    }, [selectedTasks, paperType, searchQuery]);

    useEffect(() => {
        console.log('New filter Data:');
        console.log(filterData);
        getCoverages();
        console.log('formatted data at useEffect[filterData]:');
        console.log(data)
        // once filter data has changed, apply changes to filtered Selected Paper
        updateFilteredSelectedPaper();
    }, [filterData]);

    useEffect(() => {
        updateFilteredSelectedPaper();
    },[selectedPapers]);


    return (
        <StyledCoverageScreen>
            {/* <SearchBar searchByTitle={searchByTitle} /> */}
            <CoverageFilter
                searchByTitle={searchByTitle}
                tasks={data.tasks}
                setTasks={setSelectedTasks}
                searchByPaperType={searchByPaperType}
                setSelectedPapers={setSelectedPapers}
                deleteSelectedTasks={deleteSelectedTasks}
                addSelectedTasks={addSelectedTasks}
                encodingTypes={encodingTypes}
                coverage_data={data.coverages}
                modPapers={modifySelectedPapers}
            />
            <div className='container-flex'>
                {/* <CoverageContainer
                    coverage_data={data}
                    encodingTypes={encodingTypes}
                    modPapers={modifySelectedPapers}
                /> */}
                <PapersSection
                    selected_paper={filteredSelectedPapers}
                    papers={abstractedPaperData}
                />
            </div>
        </StyledCoverageScreen>
    );
};

export default CoverageScreen;
