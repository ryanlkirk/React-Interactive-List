import React from "react";
import { TextField, Button } from "@material-ui/core";

export const TableFilters = (props) => {
    const { searchPerson, prepSearch, sortByAge } = props;
    return (
        <section className="filters">
            <TextField
                size="small"
                style={{ width: "80%", marginBottom: "5px" }}
                name="searchBar"
                id="standard-basic"
                variant="outlined"
                label="Filter by Name"
                onChange={(e) => searchPerson(e.target.value)}
                onClick={() => {
                    prepSearch();
                }}
            />

            <Button className="sort" onClick={() => sortByAge()}>
                Sort by Age
            </Button>
        </section>
    );
};

export const AddPersonButton = (props) => {
    return (
        <div
            key={`Add`}
            className="add-person"
            onClick={() => props.addPerson()}
        >
            +
        </div>
    );
};

export const MockSave = () => {
    // Mocking a basic UI save action behaviour
    return <div>Saving Changes...</div>;
};
