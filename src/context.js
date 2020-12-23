import { React, Component } from 'react';

//using context to ease the flow of props through intermediate components

//prop themeContext is initialised to light
const ThemeContext = React.createContext('light')

class Context extends React.Component {
    render() {
      // Use a Provider to pass the current theme to the tree below.
      // Any component can read it, no matter how deep it is.
      // In this example, we're passing "dark" as the current value.
      return (
        <ThemeContext.Provider value="dark">
          <Toolbar />
        </ThemeContext.Provider>
      );
    }
  }

  // A component in the middle doesn't have to
// pass the theme down explicitly anymore.
//functional component toolbar
function Toolbar() {
    return (
      <div>
        <ThemedButton />
      </div>
    );
  }

  class ThemedButton extends React.Component {
    // Assign a contextType to read the current theme context.
    // React will find the closest theme Provider above and use its value.
    // In this example, the current theme is "dark".
    //static variable to read the current theme context
    static contextType = ThemeContext;
    render() {
      return <Button theme={this.context} />;
    }
  }