import React, { useState } from "react";

export const Table = (props) => {
    let people = [
        { id: 1, name: "Steve", lastName: "Harrison", age: 47, city: "Leeds" },
        { id: 2, name: "Barry", lastName: "Scott", age: 47, city: "Leeds" },
    ];

    const [peopleArr, setPeopleArr] = useState(people);

    let searchPerson = (e) => {
        // Filter visible names, restored by deleting values from the input
        let personsArr = [...people];

        personsArr = personsArr.filter((person) =>
            `${person.name.toLowerCase()} ${person.lastName.toLowerCase()}`.includes(
                e.toLowerCase()
            )
        );
        setPeopleArr(personsArr);
    };

    let addPerson = () => {
        // Add new person to end of array
        let personsArr = [...peopleArr];

        // Find the last person, increment their ID or set to one if we have no people
        let personId = peopleArr?.slice(-1)[0]?.id
            ? peopleArr.slice(-1)[0].id + 1
            : 1;

        personsArr.push({
            id: personId,
            name: "",
            lastName: "",
            age: null,
            city: "",
        });

        setPeopleArr(personsArr);
    };

    let deletePerson = (id) => {
        // Directly remove person from people state
        setPeopleArr([...peopleArr].filter((person) => person.id !== id));
    };

    return (
        <>
            <input
                type="text"
                onChange={(e) => searchPerson(e.target.value)}
            ></input>
            <table>
                <tr>
                    <th></th>
                    <th>Forename</th>
                    <th>Surname</th>
                    <th>Age</th>
                    <th>City</th>
                </tr>
                {peopleArr.map((person) => {
                    return (
                        <tr>
                            <td
                                onClick={() => {
                                    deletePerson(person.id);
                                }}
                            >
                                x
                            </td>
                            <td>{person.name}</td>
                            <td>{person.lastName}</td>
                            <td>{person.age}</td>
                            <td>{person.city}</td>
                        </tr>
                    );
                })}
                <tr onClick={() => addPerson()}>+</tr>
            </table>
        </>
    );
};

export default Table;
