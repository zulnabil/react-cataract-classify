import React, { Component } from 'react';
import './App.css';
import Navbar from './Navbar'
import Footer from './Footer'
import model from "./eyefeatures.json";
// Importing ml5.js as ml5
import * as ml5 from "ml5";

import ImageUploader from './ImageUploader'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import SearchIcon from '@material-ui/icons/Search'


class KNNClassify extends Component {
  constructor() {
    super()
    this.state = {
      result: '',
      newImg: true
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

  handleProcess() {
    const image = document.getElementById('eye');
    const feature = this.features.infer(image)
    this.knn.classify(feature, (err, res) => {
      if (err) {
        console.error(err)
      } else {
        console.log(res.label)
        this.setState({
          result: res.label,
          newImg: false
        })
      }
    })
  }

  goClassify() {
    const image = document.getElementById('eye');
    const feature = this.features.infer(image)
    this.knn.classify(feature, (err, res) => {
      if (err) {
        console.error(err)
      } else {
        console.log(res.label)
      }
    })
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
            <h2>Cataract Identify with K-Nearest Neighbor Classification</h2>
            <Grid container justify="center">
              <Grid className="grid-sys" item>
                <ImageUploader propsChange={this.imgChange.bind(this)} />
              </Grid>
              <Grid style={{width: '300px'}} className="grid-sys" item>
                <div className="App">
                  <div>
                    <Button variant="contained" color="primary" onClick={this.handleProcess.bind(this)}><SearchIcon /> Identify</Button>

                  </div>
                  <Paper style={{display: this.state.newImg ? 'none' : 'block', marginTop: '30px', padding: '30px'}} elevation={3}>
                    <Typography component="p">
                     Your eye identified as <strong>{this.state.result}</strong>
                    </Typography>
                  </Paper>
                {/* <p style={{display: this.state.newImg ? 'none' : 'block'}}>Your eye identified as <strong>{this.state.result}</strong></p> */}
                {/* <br />with {Math.floor(Math.random() * 5)+90}% confidence</p><br></br> */}
                </div>
              </Grid>
            </Grid>
            <Footer />
        </div>
      </div>
    );
  }
}

export default KNNClassify
