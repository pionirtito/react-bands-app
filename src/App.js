//npm install --save react-bootstrap bootstrap

import React, { Component } from 'react';
import BandsList from './components/BandsList';
import Navbar from './components/Navbar';
import ModalDialog from './components/Modal';


class App extends Component {
    state = {
        bands: [],
        currentBand: {}, // pravimo zbog modala, da bi znao koji band je aktivan
        show: false // !!! DOATO ZBOG ATRIBUTA U KOMPONENTI U BOOTSTRAPU
    }

    changeCurrentBand = (band) => { // ovaj parametar se nalazi u u atributu metode u Band.js u jsx-u
        // console.log("Band Changed");
        this.setState({ currentBand: band })
        this.handleShow()
    }

    handleClose = () => { // !!! PRAVIMO JER U BS KOMPONENTI MODAL, STOJI OVA METODA 
        this.setState({show:false})
    }
    handleShow = () => {
        this.setState({ show:true })
    }
    

    componentDidMount() {
        fetch('https://raw.githubusercontent.com/Danilovesovic/bands/master/bands_with_id.json')
            .then(res => {
                return res.json()
            })
            .then(data => {
                // console.log(data);
                this.setState({ bands: data })
            })
    }
    render() {
        return (
            <>
                <Navbar />
                <BandsList bands={this.state.bands} changeCurrentBand={this.changeCurrentBand} />
                <ModalDialog show={this.state.show} currentBand={this.state.currentBand} handleClose={this.handleClose}/> {/* !!! BOOTSTRAP */}
            </>
        );
    }
}

export default App;