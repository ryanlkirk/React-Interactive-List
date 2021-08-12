import React, { useState } from "react";
// Data
import People from "../Helpers/Data";

// Components
import { TextField } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import { TableBody } from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

export const PeopleTable = () => {
    const [peopleArr, setPeopleArr] = useState(People);
    const [sortAsc, setSortAsc] = useState(true);

    const searchPerson = (e) => {
        // Filter visible names, restored by deleting values from the input
        let personsArr = [...People];

        personsArr = personsArr.filter((person) =>
            `${person.name.toLowerCase()} ${person.lastName.toLowerCase()}`.includes(
                e.toLowerCase()
            )
        );
        setPeopleArr(personsArr);
    };

    const addPerson = () => {
        // Add new person to end of array
        let personsArr = [...peopleArr];

        // Find the last person, increment their ID or set to one if we have no people
        let personId = peopleArr?.slice(-1)[0]?.id
            ? peopleArr.slice(-1)[0].id + 1
            : 1;

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

    return (
        <>
            <section className="filters">
                <TextField
                    style={{ maxWidth: "250px", marginBottom: "5px" }}
                    name="searchBar"
                    id="standard-basic"
                    variant="outlined"
                    label="Filter by Name"
                    onChange={(e) => searchPerson(e.target.value)}
                />

                <span className="sort" onClick={() => sortByAge()}>
                    Sort by Age
                </span>
            </section>
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
                                    x
                                </TableCell>
                                <TableCell>
                                    <input
                                        type="text"
                                        defaultValue={person.name}
                                        onBlur={(e) => {
                                            console.log("Save on blur");
                                        }}
                                    ></input>
                                </TableCell>
                                <TableCell>
                                    <input
                                        defaultValue={person.lastName}
                                        onBlur={(e) => {
                                            console.log("Save on blur");
                                        }}
                                    ></input>
                                </TableCell>
                                <TableCell>
                                    <input
                                        defaultValue={person.age}
                                        onBlur={(e) => {
                                            console.log("Save on blur");
                                        }}
                                    ></input>
                                </TableCell>
                                <TableCell>
                                    <input
                                        type="text"
                                        defaultValue={person.city}
                                        onBlur={(e) => {
                                            console.log("Save on blur");
                                        }}
                                    ></input>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                    <TableRow key={`delete`} onClick={() => addPerson()}>
                        <TableCell> </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </>
    );
};

export default PeopleTable;
