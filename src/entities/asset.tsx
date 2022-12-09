import { useMediaQuery } from "@mui/material";
import { List, SimpleList, Datagrid, TextField, EmailField } from "react-admin";

export const AssetList = () => {
    const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
    return (
        <List>
            {isSmall ? (
                <SimpleList
                    primaryText={(record) => record.ID}
                    secondaryText={(record) => record.Color}
                    tertiaryText={(record) => record.Owner}
                />
            ) : (
                <Datagrid rowClick="edit">
                    <TextField source="ID" />
                    <TextField source="Color" />
                    <TextField source="Owner" />
                    <TextField source="Size" />
                    <TextField source="AppraisedValue" />
                </Datagrid>
            )}
        </List>
    );
};