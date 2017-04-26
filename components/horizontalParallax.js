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
      animatedScroll: new Animated.Value(0),
      scrollEnabled: true
    }

    this.handleFocus = this.handleFocus.bind(this);
  }

  handleFocus(focused) {
    this.setState({scrollEnabled: !focused})
  }
  
  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={{flex: 1}}
          pagingEnabled
          horizontal
          scrollEnabled={this.state.scrollEnabled}
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
          images.map((image, i) =>
            <Moment
              onFocus={this.handleFocus}
              focused={!this.state.scrollEnabled}
              translateX={getInterpolate(this.state.animatedScroll, i, images.length)}
              key={i}
              {...image} 
            />
          )
        }
        {Array.apply(null, {length: images.length + 1}).map((_, i) => getSeparator(i))}
        </ScrollView>
      </View>
    );
  }
}

class Moment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scale: new Animated.Value(1)
    }
    this.handlePress = this.handlePress.bind(this);
  }

  componentWillMount() {
    this.bgFadeInterpolate = this.state.scale.interpolate({
      inputRange: [.9, 1],
      outputRange:['rgba(0, 0, 0, .3)', 'rgba(0,0,0,0)']
    })
    this.textFade = this.state.scale.interpolate({
      inputRange: [.9, 1],
      outputRange:[0, 1]
    })

    this.calloutTranslate = this.state.scale.interpolate({
      inputRange: [.9, 1],
      outputRange:[0, 150]
    })
  }

  handlePress() {
    if (this.props.focused) {
      return Animated.timing(this.state.scale, {
        toValue: 1,
        duration: 1000
      }).start(() => this.props.onFocus(false))
    }
    return Animated.timing(this.state.scale, {
      toValue: .9, duration: 1000
    }).start(() => this.props.onFocus(true))
  }

  render() {
    const animatedStyle = {
      transform: [
        {translateX: this.props.translateX},
        {scale: this.state.scale}
      ]
    }

    const bgFadeStyle = {
      backgroundColor: this.bgFadeInterpolate
    }

    const textFadeStyle = {
      opacity: this.textFade
    }

    const calloutStyle = {
      transform: [{translateY: this.calloutTranslate}]
    }

    return (
      <View style={styles.momentContainer}>
        <Animated.Image 
          source={{uri: this.props.url}}
          style={[styles.image, animatedStyle]}
          resizeMode="cover"
        />
        <TouchableWithoutFeedback onPress={this.handlePress}>
          <Animated.View style={[StyleSheet.absoluteFill, styles.center, bgFadeStyle]}>
          	<Animated.View style={styles.textWrap, textFadeStyle}>
          		<Text style={styles.title}>
          			{this.props.title}
          		</Text>
          	</Animated.View>
          </Animated.View>
          </TouchableWithoutFeedback>
          <Animated.View style={[styles.callout, calloutStyle]}>
            <View>
              <Text style={styles.title}>
                {this.props.title}
              </Text>
            </View>
          </Animated.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
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
  },
  callout: {
    height: 150,
    backgroundColor: 'rgba(0,0,0,.5)',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0
  }
});
