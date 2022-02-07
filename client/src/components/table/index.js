import React from 'react';
import classes from './table.module.scss';
import { convertToNormalDate, isIsoDate } from '../componentUtils';

const Table = ({ emails, columns, handleSelectedRow, handleDelete }) => {

  return (
    <>
       <table>
           <thead>
               <tr>
                    {
                        columns.map((item, index) => <TableHeaderItem item={item} key={index}/>)
                    }
               </tr>
           </thead>
           <tbody>
               {
                   emails.map((item, index) => 
                   <TableRow 
                        item={item} 
                        key={index} 
                        index={index}
                        handleSelectedRow={handleSelectedRow} 
                        handleDelete={handleDelete}
                    />
                )
               }
           </tbody>
       </table>
    </>
  ) 
};

const TableHeaderItem = ({ item } ) => <th>{item.heading}</th>
const TableRow = ({ item, index, handleSelectedRow, handleDelete }) => {
    const items = Object.values(item);
    items.push(
        <input 
            type="checkbox" 
            name="checkbox" 
            className={classes.checkBox} 
            id={index}
            onChange={handleSelectedRow}
        />
    );
    items.push(
        <button 
                    className={classes.delete} 
                    onClick={handleDelete}
                    id={index}
                >
                    Delete
        </button>
    );
    return (
        <tr>
            {
            items.map((item, index) => {
                if (isIsoDate(item)) {
                    return <td key={index}>{convertToNormalDate(item)}</td>
                }
                return <td key={index}>{item}</td>
            })
            }
            <td>
                
            </td>
            <td>
                
            </td>
        </tr>
    )
    
}
    

export default Table;
