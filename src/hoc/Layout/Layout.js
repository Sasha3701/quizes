import React from 'react';
import { connect } from 'react-redux';
import Drawer from '../../Components/Navigation/Drawer/Drawer';
import MenuToggle from '../../Components/Navigation/MenuToggle/MenuToggle';
import classes from './Layout.css'; 

class Layout extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      menu: false
    }
  }

  toggleMenuHandler = () => {
    this.setState(prevState => {
      return {
        menu: !prevState.menu
      }
    })
  }

  menuCloseHandler = () => {
    this.setState({
      menu: false
    })
  }

  render() {
    return (
      <div className={classes.Layout}>
        <Drawer isAuthenticated={this.props.isAuthenticated} isOpen={this.state.menu} onClose={this.menuCloseHandler}/>
        <MenuToggle onToggle={this.toggleMenuHandler} isOpen={this.state.menu}/>
        <main>{this.props.children}</main>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token
  }
}

export default connect(mapStateToProps)(Layout);
