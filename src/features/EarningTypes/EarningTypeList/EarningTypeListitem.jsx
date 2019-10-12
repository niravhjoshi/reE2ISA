import React, { Component } from 'react'
import { Table, Icon, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';



class EarningTypeListitem extends Component {
    render() {

        const { earningtypes, deleteEartype } = this.props;

        return (
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Expense Type Name</Table.HeaderCell>
                        <Table.HeaderCell>PersonID</Table.HeaderCell>
                        <Table.HeaderCell>Expense Added Date</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    <Table.Row>

                        <Table.Cell collapsing>{earningtypes.EarningTypeName}</Table.Cell>
                        <Table.Cell collapsing>{earningtypes.PersonID}</Table.Cell>
                        <Table.Cell collapsing>{earningtypes.EarningType_Created}<Icon name="clock" /></Table.Cell>


                        <Table.Cell collapsing>
                            <Button inverted color='teal' as={Link} to={`/EarningTypes/${earningtypes.id}`}>View</Button>
                            <Button inverted color='red' onClick={() => deleteEartype(earningtypes.id)}>Delete</Button>

                        </Table.Cell>

                    </Table.Row>

                </Table.Body>

            </Table>
        )
    }
}

export default EarningTypeListitem