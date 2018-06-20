import React, {Component} from "react"
import { Provider } from 'mobx-react'
import { HashRouter, Switch, Route ,hashHistory} from 'react-router-dom';

import Header from '../components/header/header'
import Footer from '../components/footer/footer'
import NotFound from '../notfound/notfound'

import routers from '../../router/router'



class Home extends Component {
	render(){
			return (
				<Provider {...this.props}>
				<div>
					<Header/>
					<Switch>
						{routers.map((route, i) => {
							return <Route key={i} exact path={route.path} component={route.component}/>
						})}
						
						<Route component={NotFound}/>
						</Switch>
					<Footer />	
				</div>
				</Provider>
			)

	}
}

export default Home;
