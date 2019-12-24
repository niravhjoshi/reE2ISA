import React, { Component } from 'react'
import { Table, Icon, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';


class EarningTypeListitem extends Component {
    render() {

        const { earningtype, deleteEartype } = this.props;

        return (
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Earning Type Name</Table.HeaderCell>
                        <Table.HeaderCell>Earning Person Name</Table.HeaderCell>
                        <Table.HeaderCell>Earning Added Date</Table.HeaderCell>
                        <Table.HeaderCell>Creator Name</Table.HeaderCell>
                        <Table.HeaderCell>Operations</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    <Table.Row>

                        <Table.Cell collapsing>{earningtype.EarningType}</Table.Cell>
                        <Table.Cell collapsing>{earningtype.PersonName}</Table.Cell>
                        {/* <Table.Cell collapsing>{earningtype.created}<Icon name="clock" /></Table.Cell> */}
                        <Table.Cell collapsing>{earningtype.created && format(earningtype.created.toDate(), 'EEEE do LLL')} at {format(earningtype.created.toDate(), 'h:mm a')}<Icon name="clock" /></Table.Cell>

                        <Table.Cell collapsing>{earningtype.CreatorName}</Table.Cell>


                        <Table.Cell collapsing>
                            <Button inverted color='teal' as={Link} to={`/EarningTypes/${earningtype.id}`}>View</Button>
                            <Button inverted color='red' onClick={() => deleteEartype(earningtype.id)}>Delete</Button>

                        </Table.Cell>

                    </Table.Row>

                </Table.Body>

            </Table>
        )
    }
}

export default EarningTypeListitem