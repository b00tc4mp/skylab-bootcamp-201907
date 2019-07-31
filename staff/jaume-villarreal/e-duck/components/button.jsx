class Button extends React.Component {
  constructor(props) {
    super(props);
    
    this.handleClick = this.handleClick.bind(this);
    this.toggleNavigation = this.toggleNavigation.bind(this);
  }

  handleClick = expression => {    
    expression
  }
  

 toggleNavigation = (fromComponent , toComponent) => {
    // this.setState({ fromCom: false, toComp: true })
    console.log(fromComponent)
}



  render() {
    return (
      <button onClick={() =>this.handleClick(this.toggleNavigation(state.landing , state.openRegister))}>{this.props.name}</button>
    )
  }
}


//   handleClick() {
//     this.setState(state => ({
//       isToggleOn: !state.isToggleOn
//     }));
//   }