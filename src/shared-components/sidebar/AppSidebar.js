import React, { Component } from 'react';
import { Navigation, Link, ListDivider } from 'react-toolbox';

class AppSidebar extends Component {
	render() {
		return (
			<Navigation type="vertical">
				<Link href="#" label='Mapa' />
				<Link href="#" label='Reporta' />
				<Link href="#" label='Verifica' />
				<Link href="#" label='Alertas' />
				<ListDivider />
				<Link href="#" label='Salir' />
			</Navigation>
		)
	}
}

export default AppSidebar;
