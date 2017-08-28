import React, { Component } from 'react';
import { StyleSheet, View, Image, Animated, Dimensions } from 'react-native';
import Interactable from 'react-native-interactable';
import cardDeck from './Utils/cardDeck'
import Card from './Components/card'

const widthFactor = Dimensions.get('window').width / 375;
const heightFactor = (Dimensions.get('window').height - 75) / 667;



const showSecondFace = true;

export default class ChatHeads extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deck:null
    }
    this._deltaX = new Animated.Value(0);
    this._deltaY = new Animated.Value(0);
  }
  componentDidMount() {
    this.setState({deck:cardDeck()})
  }
  removeCardById = (id) => {
    console.log('here2',id)
    this.setState({
      deck:this.state.deck.filter(card => {
          if(id != card.id)
            return card
      })
    })
  }
  render() {
    const {deck} = this.state;
    console.log(deck)
    return (
      <View style={styles.container}>
        <View style={styles.frame}>
          <Animated.Image
            source={require('./assets/chatheads-delete.png')}
            style={[styles.marker, {top: 200*heightFactor}, {
              opacity: this._deltaY.interpolate({
                inputRange: [-10*heightFactor, 50*heightFactor],
                outputRange: [0, 1],
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp'
              }),
              transform: [{
                translateX: this._deltaX.interpolate({
                  inputRange: [-140*widthFactor, 140*widthFactor],
                  outputRange: [-10, 10]
                })
              },
              {
                translateY: this._deltaY.interpolate({
                  inputRange: [-30*heightFactor, 50*heightFactor, 270*heightFactor],
                  outputRange: [50*heightFactor, -10, 10],
                  extrapolateLeft: 'clamp'
                })
              }]
            }
          ]} />
        </View>

        {
          deck && deck.map((card,i)=> {
            let position = i * 10;
            return (
              <Card
                key={i}
                suit={card.suit}
                name={card.name}
                position={position}
                id={card.id}
                removeCardById={this.removeCardById}/>
            )
          })
        }

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eff7ff',
  },
  frame: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor:'blue'
  },
  marker: {
    width: 60,
    height: 60,
    margin: 10,
    position: 'relative'
  },
});
