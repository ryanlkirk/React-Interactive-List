import React from "react";
import { TextField, Button } from "@material-ui/core";

export const TableFilters = (props) => {
    const { searchPerson, prepSearch, sortByAge, noOfPeople } = props;
    const blockInteract = noOfPeople < 2 ? true : false;
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

            <Button disabled={blockInteract} className="sort" onClick={() => sortByAge()}>
                Sort by Age
            </Button>
        </section>
    );
};

export const AddPersonButton = (props) => {
    const { addPerson, noOfPeople } = props;
    return (
        <div key={`Add`} className="add-person" onClick={() => addPerson()}>
            {noOfPeople <= 0 && <div>Add a new Person</div>}
            <span>&#43;</span>
        </div>
    );
};