import React, { Component } from 'react';
import Footer from './Footer'
import Navbar from './Navbar'
import model from "./eyefeatures.json";
// Importing ml5.js as ml5
import * as ml5 from "ml5";

import ImageUploader from './ImageUploader'
import Fab from '@material-ui/core/Fab'
import SaveIcon from '@material-ui/icons/Save'
import AddIcon from '@material-ui/icons/Add'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


class ExtractFeature extends Component {
  constructor() {
    super()
    this.state = {
      newImg: true,
      normalSample: 0,
      cataractSample: 0
    }
    this.features = ml5.featureExtractor('MobileNet', this.modelReady.bind(this))
    this.knn = ml5.KNNClassifier()
  }

  modelReady() {
    console.log('MobileNet Loaded!')
    this.knn.load(model, function() {
      console.log('KNN Data Loaded!')
    })
  }
  
  addNormal() {
    const image = document.getElementById('eye');
    const feature = this.features.infer(image)
    this.knn.addExample(feature, 'normal')
    console.log('Normal sample added!')
    // alert('Normal sample added!')
    this.setState((prev) => ({
      normalSample: prev.normalSample + 1
    }))
  }

  addCataract() {
    const image = document.getElementById('eye');
    const feature = this.features.infer(image)
    this.knn.addExample(feature, 'cataract')
    console.log('Cataract sample added!')
    // alert('Cataract sample added!')
    this.setState((prev) => ({
      cataractSample: prev.cataractSample + 1
    }))
  }

  saveFeatures() {
    this.knn.save('features.json')
  }

  imgChange() {
    this.setState({
      newImg: true
    })
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          <h2>Add Sample for Feature Extractor</h2>
          <Grid container justify="center">
            <Grid className="grid-sys" item>
              <ImageUploader propsChange={this.imgChange.bind(this)} />
            </Grid>
            <Grid className="grid-sys" item>
            <div className="App">
                <Fab size="medium" variant="extended" className="btn-feature" onClick={this.addNormal.bind(this)}><AddIcon /> Normal Sample</Fab>
                <Fab size="medium" variant="extended" className="btn-feature" onClick={this.addCataract.bind(this)}><AddIcon /> Cataract Sample</Fab>
                <Fab size="medium" color="primary" className="btn-feature" onClick={this.saveFeatures.bind(this)}><SaveIcon /></Fab>
                <Paper style={{display: this.state.normalSample ? 'block' : 'none', marginTop: '30px', padding: '30px'}} elevation={3}>
                  <Typography component="p">
                    Normal Sample Successfully Added ({this.state.normalSample})
                  </Typography>
                </Paper>
                <Paper style={{display: this.state.cataractSample ? 'block' : 'none', marginTop: '15px', padding: '30px'}} elevation={3}>
                  <Typography component="p">
                    Cataract Sample Successfully Added ({this.state.cataractSample})
                  </Typography>
                </Paper>
            </div>
            </Grid>
          </Grid>
          <Footer />
        </div>
      </div>
    );
  }
}

export default ExtractFeature;
