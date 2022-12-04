import React from 'react';
import {Tab} from 'semantic-ui-react'

const panes = [
    { menuItem: 'Tab 1', render: () => <Tab.Pane>

        </Tab.Pane> },
    { menuItem: 'Tab 2', render: () => <Tab.Pane>

        </Tab.Pane> },
    { menuItem: 'Tab 3', render: () => <Tab.Pane>

        </Tab.Pane> },
]

const DataUpdate = () => {
    return (
        <Tab panes={panes}/>
    );
};

export default DataUpdate;