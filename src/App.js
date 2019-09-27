import React from 'react';

import { TreeView, processTreeViewItems, handleTreeViewCheckChange, moveTreeViewItem, TreeViewDragAnalyzer, TreeViewDragClue } from '@progress/kendo-react-treeview'


const tree = [{
    text: 'Furniture', items: [
        { text: 'Tables & Chairs' , items: [{text: "test"}]}, { text: 'Sofas' }, { text: 'Occasional Furniture' }]
}, {
    text: 'Decor', items: [
        { text: 'Bed Linen' }, { text: 'Curtains & Blinds' }, { text: 'Carpets' }]
}];

class App extends React.Component {
    render() {
        return (
            <TreeView
                data={tree}
                expandIcons={true}
                onExpandChange={this.onExpandChange}
                onItemClick={this.onItemClick}
                aria-multiselectable={true}
            />
        );
    }
    onItemClick = (event) => {
        event.item.selected = !event.item.selected;
        this.forceUpdate();
    }
    onExpandChange = (event) => {
        event.item.expanded = !event.item.expanded;
        this.forceUpdate();
    }
}

export default  App;

