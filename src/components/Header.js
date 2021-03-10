import React, { useState } from 'react';
import './Header.css';
import { Button, Dropdown, Input } from 'antd';
import axios from 'axios';
import { Menu } from 'antd';

export default function Header(props) {
    const [source, setSource] = useState(null);
    const [destination, setDestination] = useState(null);
    const [sourceData, setSourceData] = useState(null);
    const [destinationData, setDestinationData] = useState(null);
    const [sourceIndex, setSourceIndex] = useState(null);
    const [destinationIndex, setDestinationIndex] = useState(null);
    const [sourceStartPosition, setSourceStartPosition] = useState(null);
    const [sourceEndPosition, setSourceEndPosition] = useState(null);
    const [destinationStartPosition, setDestinationStartPosition] = useState(null);
    const [destinationEndPosition, setDestinationEndPosition] = useState(null);
    
    const getSource = (e) => {
        setSource(e.target.value)
        sourceAutoSuggestion(source)
    }

    const getDestination = (e) => {
        setDestination(e.target.value)
        destinationAutoSuggestion(destination)
    }

    const sourceAutoSuggestion = async (location) => {
        const url = `https://api.tomtom.com/search/2/search/${location}.json?lat=37.337&lon=-121.89&key=FkQnsdmD8hOSrfACM4V2hNYSLbSAPnMG`;
        try{
          const response = await axios.get(url);
          const responseData = await response.data; 
          setSourceData(responseData)
          console.log(sourceData)
        } catch(error){
          console.log(error)
        }
    }

    const destinationAutoSuggestion = async (location) => {
        const url = `https://api.tomtom.com/search/2/search/${location}.json?lat=37.337&lon=-121.89&key=FkQnsdmD8hOSrfACM4V2hNYSLbSAPnMG`;
        try{
          const response = await axios.get(url);
          const responseData = await response.data; 
          setDestinationData(responseData)
          console.log(destinationData)
        } catch(error){
          console.log(error)
        }
    }

    const changeSource = (e) => {
        let result = e.item?.props?.children[1];
        let index = e.item?.props?.index;
        setSourceIndex(index);
        setSource(result);
        setSourceStartPosition(sourceData?.results[index]?.position?.lat)
        setSourceEndPosition(sourceData?.results[index]?.position?.lon)
        console.log(e.item?.props?.index)
        console.log(source)
        console.log(sourceIndex)
    }
    
    const changeDestination = (e) => {
        let result = e.item?.props?.children[1];
        let index = e.item?.props?.index;
        setDestinationIndex(index);
        setDestination(result);
        console.log(destinationData, destinationIndex)
        console.log("Destination " + destinationData?.results[index]?.position?.lon)
        setDestinationStartPosition(destinationData?.results[index]?.position?.lat)
        setDestinationEndPosition(destinationData?.results[index]?.position?.lon)
        console.log(destination)
        console.log(destinationIndex)
    }
    
    console.log(sourceData?.results[sourceIndex]?.position?.lat)
    console.log(sourceData?.results[sourceIndex]?.position?.lon)

    console.log(sourceStartPosition) 
    console.log(sourceEndPosition)
    console.log(destinationStartPosition)
    console.log(destinationEndPosition)

    const handleClick = () => {
        // props.locateMap(sourceStartPosition, sourceEndPosition)
        props.getPositions(sourceStartPosition, sourceEndPosition, destinationStartPosition, destinationEndPosition)
        console.log(sourceStartPosition) 
        console.log(sourceEndPosition)
        console.log(destinationStartPosition)
        console.log(destinationEndPosition)
        console.log(sourceData)
        console.log(sourceData?.results[sourceIndex]?.position?.lat)
        // console.log(this.state.sourceIndex)
        // console.log(this.state.destinationIndex)
        // console.log(this.state.sourceStartPosition)
        // console.log(this.state.sourceEndPosition)
        // console.log(this.state.destinationStartPosition)
        // console.log(this.state.destinationEndPosition)
    }
    
    // const { destination } = this.state;
    // console.log(this.state.sourceIndex)
    
    const sourceMenu = (
        <Menu>
            {
                sourceData?.results.map((result) => (
                    <Menu.Item onClick={changeSource}>
                        {result?.address?.freeformAddress}
                    </Menu.Item>
                ))
            }
        </Menu>
    )

    const destinationMenu = (
        <Menu>
            {
                destinationData?.results.map((result) => (
                    <Menu.Item onClick={changeDestination}>
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
                        value={source}
                        name="source"
                        onChange={getSource}
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
                        onChange={getDestination}
                    />
                </Dropdown>
            <Button type="primary" className="header_Button" onClick={handleClick} >Get Route</Button>
        </header>
    )
}