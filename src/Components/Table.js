import React, { useState } from "react";
// Data
import People from "../Helpers/Data";

// Components
import Table from "@material-ui/core/Table";
import { TableBody } from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { TableFilters, AddPersonButton, MockSave } from "./TableParts";

export const PeopleTable = () => {
    const [peopleArr, setPeopleArr] = useState(People);
    const [sortAsc, setSortAsc] = useState(true);
    const [saving, setSaving] = useState(false);
    const [storePeople, setStorePeople] = useState([]);

    const prepSearch = () => {
        // A row can be added without adding data.
        // If we had added one without entering a name, remove them.
        setPeopleArr(
            peopleArr.filter((person) => person.name || person.lastName)
        );
        // Fixed mock data is being pulled from an import
        // Setting up a copy of the state of the data here before filtering down the data with a search
        setStorePeople(
            peopleArr.filter((person) => person.name || person.lastName)
        );
    };

    const searchPerson = (searchValue) => {
        // Filter visible names, restored by deleting values from the input
        let filteredArr = [...peopleArr];

        filteredArr = filteredArr.filter((person) =>
            `${person.name.toLowerCase()} ${person.lastName.toLowerCase()}`.includes(
                searchValue.toLowerCase()
            )
        );

        if (!searchValue) {
            // Reset pupils to the state it was before filtering started
            setPeopleArr(storePeople);
        } else {
            // Filter the pupils down to just the one we want
            // Fine to filter this way as its not attached to any real stored data
            setPeopleArr(filteredArr);
        }
    };

    const addPerson = () => {
        // Add new person to end of array
        let personsArr = [...peopleArr];

        // Find the last person, increment their ID or set to 1 if we have no people
        let personId = peopleArr?.slice(-1)[0]?.id
            ? peopleArr.slice(-1)[0].id + 1
            : 1;

        // Add a person to the end of the list, it wont save until a value is entered
        personsArr.push({
            id: personId,
            name: null,
            lastName: null,
            age: null,
            city: null,
        });

        setPeopleArr(personsArr);
    };

    const deletePerson = (id) => {
        // Directly remove person from people state
        setPeopleArr([...peopleArr].filter((person) => person.id !== id));
    };

    const sortByAge = () => {
        // Sort and toggle asc and dec sort
        let personsArr = [...peopleArr];
        if (sortAsc) {
            personsArr.sort((a, b) => {
                return b.age - a.age;
            });
        } else {
            personsArr.sort((a, b) => {
                return a.age - b.age;
            });
        }
        setSortAsc(!sortAsc);
        setPeopleArr(personsArr);
    };

    const updateValue = (person, key, value) => {
        let personsArr = [...peopleArr];
        let valueToUpdate = (personsArr.find(({ id }) => id === person.id)[
            key
        ] = value);
        // Find the person we want to update
        if (valueToUpdate) {
            setPeopleArr(personsArr);
            // Emulate some kind of save promise being returning successfully
            setSaving(true);
            setTimeout(function () {
                setSaving(false);
            }, 750);
        }
    };

    return (
        <section className={"people-table"}>
            <TableFilters
                sortByAge={sortByAge}
                searchPerson={searchPerson}
                prepSearch={prepSearch}
            />

            {saving && <MockSave />}
            <section className="table-area">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>Forename</TableCell>
                            <TableCell>Surname</TableCell>
                            <TableCell>Age</TableCell>
                            <TableCell>City</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {peopleArr.map((person) => {
                            return (
                                <TableRow key={`key-${person.id}`}>
                                    <TableCell
                                        onClick={() => {
                                            deletePerson(person.id);
                                        }}
                                    >
                                        <span className="delete-person">x</span>
                                    </TableCell>
                                    <TableCell>
                                        <input
                                            type="text"
                                            defaultValue={person.name}
                                            onBlur={(e) => {
                                                updateValue(
                                                    person,
                                                    "name",
                                                    e.target.value
                                                );
                                            }}
                                            placeholder="First Name"
                                            required
                                        ></input>
                                    </TableCell>
                                    <TableCell>
                                        <input
                                            type="text"
                                            defaultValue={person.lastName}
                                            onBlur={(e) => {
                                                updateValue(
                                                    person,
                                                    "lastName",
                                                    e.target.value
                                                );
                                            }}
                                            placeholder="Last Name"
                                        ></input>
                                    </TableCell>
                                    <TableCell>
                                        <input
                                            type="number"
                                            defaultValue={person.age}
                                            onBlur={(e) => {
                                                updateValue(
                                                    person,
                                                    "age",
                                                    e.target.value
                                                );
                                            }}
                                            placeholder="Age"
                                        ></input>
                                    </TableCell>
                                    <TableCell>
                                        <input
                                            type="text"
                                            defaultValue={person.city}
                                            onBlur={(e) => {
                                                updateValue(
                                                    person,
                                                    "city",
                                                    e.target.value
                                                );
                                            }}
                                            placeholder="City"
                                        ></input>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </section>
            <AddPersonButton addPerson={() => addPerson()} />
        </section>
    );
};

export default PeopleTable;
