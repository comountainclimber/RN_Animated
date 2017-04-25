import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Animated,
  TouchableWithoutFeedback
} from 'react-native';

const {width, height} = Dimensions.get('window');

const images = [
  {title: 'Sweet Foo Foo', url: `https://lorempixel.com/${width}/${height}/`},
  {title: 'Foo bar bones', url: `https://lorempixel.com/${width + 2}/${height}/`},  
  {title: 'Apple Pie For You', url: `https://lorempixel.com/${width + 3}/${height}/`},
    {title: 'Sweet Foo Foo', url: `https://lorempixel.com/${width}/${height}/`},
  {title: 'Foo bar bones', url: `https://lorempixel.com/${width + 2}/${height}/`},  
  {title: 'Apple Pie For You', url: `https://lorempixel.com/${width + 3}/${height}/`},
    {title: 'Sweet Foo Foo', url: `https://lorempixel.com/${width}/${height}/`},
  {title: 'Foo bar bones', url: `https://lorempixel.com/${width + 2}/${height}/`},  
  {title: 'Apple Pie For You', url: `https://lorempixel.com/${width + 3}/${height}/`},
    {title: 'Sweet Foo Foo', url: `https://lorempixel.com/${width}/${height}/`},
  {title: 'Foo bar bones', url: `https://lorempixel.com/${width + 2}/${height}/`},  
  {title: 'Apple Pie For You', url: `https://lorempixel.com/${width + 3}/${height}/`}
]

const getInterpolate = (animatedScroll, i, imageLength) => {
	const inputRange = [
		(i - 1) * width,
		i * width,
		(i + 1) * width
	]

	const outputRange = i === 0 ? [0, 0, 150] : [ -300, 0 ,150];

	return animatedScroll.interpolate({
		inputRange,
		outputRange,
		extrapolate: 'clamp'
	})
}

const getSeparator = i =>
	<View key={i} style={[styles.seperate, {left: (i -1) * width - 2.5}]} />

export default class Horizontal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animatedScroll: new Animated.Value(0)
    }
  }
  
  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={{flex: 1}}
          pagingEnabled
          horizontal
          scrollEventThrottle={16}
          onScroll={
            Animated.event([
              {
                nativeEvent: {
                  contentOffset: {
                    x: this.state.animatedScroll
                  }
                }
              }
            ])
          }
        >
        {
          images.map((image, i) => <Moment translateX={getInterpolate(this.state.animatedScroll, i, images.length)} key={i} {...image} />)
        }
        {Array.apply(null, {length: images.length + 1}).map((_, i) => getSeparator(i))}
        </ScrollView>
      </View>
    );
  }
}

const Moment = (props) => {
  console.log(props)

    const animatedStyle = {
  		transform: [
  			{
  				translateX: props.translateX
  			}
  		]
  	}

  return (
    <View style={styles.momentContainer}>
      <Animated.Image 
        source={{uri: props.url}}
        style={[styles.image, animatedStyle]}
        resizeMode="cover"
      />
      <View style={[StyleSheet.absoluteFill, styles.center]}>
      	<View style={styles.textWrap}>
      		<Text style={styles.title}>
      			{props.title}
      		</Text>
      	</View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    //paddingTop: Constants.statusBarHeight,
    // backgroundColor: 'purple',
  },
  momentContainer: {
    width: width,
    height: height,
    overflow: 'hidden'
  },
  image: {
    flex: 1,
    width: null,
    height: null
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
  center: {
  	justifyContent: 'center'
  },
  textWrap: {
  	backgroundColor: 'grey',
  	backgroundColor: 'rgba(0, 0, 0, 0.3)',
  	paddingVertical: 10
  },
  title: {
  	backgroundColor: 'transparent',
  	fontSize: 30,
  	color: 'white',
  	textAlign: 'center'
  },
  seperate: {
  	backgroundColor: 'black',
  	position: 'absolute',
  	top: 0,
  	bottom: 0,
  	width: 5
  }
});
