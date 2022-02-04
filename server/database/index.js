import { performQueryWithParams } from "./connection";

const createTable = async () => {
    await performQueryWithParams(
        "CREATE TABLE IF NOT EXISTS emails(id int NOT NULL AUTO_INCREMENT, email varchar(255), provider varchar(255), added DATETIME, PRIMARY KEY(id));",
        []
    );

}


createTable();