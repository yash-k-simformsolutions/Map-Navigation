import React, { Component } from 'react';
import './Header.css';
import { Button, Dropdown, Input } from 'antd';
import axios from 'axios';
import { Menu } from 'antd';

export default class SideBar extends Component {
    state = {
        source: null,
        sourceData: null,
        destination: null,
        destinationData: null,
        sourceIndex: null,
        destinationIndex: null,
        sourceStartPosition: null,
        sourceEndPosition: null,
        destinationStartPosition: null,
        destinationEndPosition: null,
    }

    getSource = (e) => {
        this.setState({
            source: e.target.value,
        }, () => {
            this.sourceAutoSuggestion(this.state.source)
        })
    }

    getDestination = (e) => {
        this.setState({
            destination: e.target.value,
        }, () => {
            this.destinationAutoSuggestion(this.state.destination)
        })
    }

    sourceAutoSuggestion = async (location) => {
        const url = `https://api.tomtom.com/search/2/search/${location}.json?lat=37.337&lon=-121.89&key=aYHki4CsTAmcezV1KW5fFqdumSH0zkC5`;
        try{
          const response = await axios.get(url);
          const responseData = await response.data; 
          this.setState({
              sourceData: responseData
          })
          console.log(this.state.sourceData)
        } catch(error){
          console.log(error)
        }
    }

    destinationAutoSuggestion = async (location) => {
        const url = `https://api.tomtom.com/search/2/search/${location}.json?lat=37.337&lon=-121.89&key=aYHki4CsTAmcezV1KW5fFqdumSH0zkC5`;
        try{
          const response = await axios.get(url);
          const responseData = await response.data; 
          this.setState({
            destinationData: responseData,
          })
        console.log(this.state.destinationData)
        } catch(error){
          console.log(error)
        }
    }

    changeSource = (e) => {
        let result = e.item?.props?.children[1];
        let index = e.item?.props?.index;
        this.setState({
            sourceIndex: index,
            source: result,
        })
        console.log(e.item?.props?.index)
        console.log(this.state.source)
        console.log(this.state.sourceIndex)
    }
    
    changeDestination = (e) => {
        let result = e.item?.props?.children[1];
        let index = e.item?.props?.index;
        this.setState({
            destination: result,
            destinationIndex: index,
        })
        console.log(this.state.destination)
        console.log(this.state.destinationIndex)
    }
    
    handleClick = () => {
        this.setState({
            sourceStartPosition: this.state.sourceData?.results[this.state.sourceIndex]?.position?.lat,
            sourceEndPosition: this.state.sourceData?.results[this.state.sourceIndex]?.position?.lon,
            destinationStartPosition: this.state.destinationData?.results[this.state.destinationIndex]?.position?.lat,
            destinationEndPosition: this.state.destinationData?.results[this.state.destinationIndex]?.position?.lon,
        }, () => {
            this.props.getPositions(this.state.sourceStartPosition,this.state.sourceEndPosition, this.state.destinationStartPosition, this.state.destinationEndPosition)
        })
        console.log(this.state.sourceData)
        console.log(this.state.sourceData?.results[this.state.sourceIndex]?.position?.lat)
        // console.log(this.state.sourceIndex)
        // console.log(this.state.destinationIndex)
        // console.log(this.state.sourceStartPosition)
        // console.log(this.state.sourceEndPosition)
        // console.log(this.state.destinationStartPosition)
        // console.log(this.state.destinationEndPosition)
    }
    
    render() {
        const { destination } = this.state;
        // console.log(this.state.sourceIndex)
        
        const sourceMenu = (
            <Menu>
                {
                    this.state.sourceData?.results.map((result) => (
                        <Menu.Item onClick={this.changeSource}>
                            {result?.address?.freeformAddress}
                        </Menu.Item>
                    ))
                }
            </Menu>
        )

        const destinationMenu = (
            <Menu>
                {
                    this.state.destinationData?.results.map((result) => (
                        <Menu.Item onClick={this.changeDestination}>
                            {result?.address?.freeformAddress}
                        </Menu.Item>
                    ))
                }
            </Menu>
        )

        return (
            <header className="header">
                    <Dropdown
                        overlay={sourceMenu}
                        placement="bottomCenter"
                        arrow
                    >
                        <Input 
                            placeholder="Enter Source" 
                            className="header_Input" 
                            value={this.state.source}
                            name="source"
                            onChange={this.getSource}
                        />
                    </Dropdown>
                    <Dropdown
                        overlay={destinationMenu}
                        placement="bottomCenter"
                        arrow
                    >
                        <Input 
                            placeholder="Enter Destination" 
                            className="header_Input" 
                            value={destination}
                            name="destination"
                            onChange={this.getDestination}
                        />
                    </Dropdown>
                <Button type="primary" className="header_Button" onClick={this.handleClick} >Get Route</Button>
            </header>
        )
    }
}