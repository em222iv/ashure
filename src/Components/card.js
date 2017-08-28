import React, { Component } from 'react';
import { StyleSheet, View, Image, Animated, Dimensions, Text } from 'react-native';
import Interactable from 'react-native-interactable';

const widthFactor = Dimensions.get('window').width / 375;
const heightFactor = (Dimensions.get('window').height - 75) / 667;
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const upperLeftCorner = {x:10, y:10} // upperLeft
const upperRightCorner = {x:width-80, y:10} // upperRight
const lowerRightCorner = {x:width-80, y:height-150} //lowerRight
const lowerLeftCorner = {x:10, y:height - 150} // lowerLeft

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      [props.id]: new Animated.Value(1),
    }
    this._deltaX = new Animated.Value(0);
    this._deltaY = new Animated.Value(0);
  }
  render() {
    const {id} = this.props;
    return (
        <View style={styles.frame}>
          <Interactable.View
            animatedValueX={this._deltaX}
            animatedValueY={this._deltaY}
            animatedNativeDriver={true}
            gravityPoints={[
              // {...lowerLeftCorner,  strength: 8000, falloff: 10, damping: 0.5, haptics: true },//lower left corner - initialPosition
              {...lowerRightCorner, strength: 8000, falloff: 20, damping: 0.5, haptics: true },//lower right conterner
              {...upperLeftCorner,  strength: 8000, falloff: 20, damping: 0.5, haptics: true }, // upper riht corner
              {...upperRightCorner, strength: 8000, falloff: 20, damping: 0.5, haptics: true } // upper riht corner
            ]}
            snapPoints={[
              {...lowerLeftCorner,  id:this.props.id},//lower left corner - initialPosition
              {...lowerRightCorner, id:this.props.id},//lower right conterner
              {...upperLeftCorner,  id:this.props.id},// upper riht corner
              {...upperRightCorner, id:this.props.id}// upper riht corner
            ]}
            boundaries={{left: 5, right: width-75,top:5,bottom:height-130, bounce: 0.5}}
            onSnap={this.onSnap}
            // onStop={(event) => this.onStopInteraction(event,this.state._cardScale)}
            initialPosition={{x:10, y:height - 150}}>
            <Animated.View style={[styles.card,
              // {opacity:this.state.cardStyle},
              {
                transform: [{
                  scale: this.state[id]
                }]
            }]}>
            <Text>{this.props.name} / {this.props.suit}</Text>
            </Animated.View>
          </Interactable.View>
        </View>
    );
  }
  onSnap = (event) => {
    const { id, index } = event.nativeEvent;
    let action = this.getActionFromId(index,id)
    action()
  }
  getActionFromId = (index,id) => {
   switch (index) {
     case 0:
       //'lower left'
       return () => {}
       break;
     case 1:
       //'lower right'
       return () => Animated.timing(this.state[id], {toValue: 0,duration:300,useNativeDriver:true}).start(() => {
           this.props.removeCardById(id)
       });
       break
     case 2:
       //'upper left'
       return () => Animated.timing(this.state[id], {toValue: 0,duration:300,useNativeDriver:true}).start(() => {
           this.props.removeCardById(id)
       });
       break;
     case 3:
       //'upper right'
       return () => Animated.timing(this.state[id], {toValue: 0,duration:300,useNativeDriver:true}).start(() => {
           this.props.removeCardById(id)
       });
       break;
     default:

   }
 }
}
    // <Image style={styles.image} source={require('../assets/chatheads-delete.png')} />
const styles = StyleSheet.create({
  card: {
    width: 70,
    height: 100,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'red',
  },
  frame: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});
