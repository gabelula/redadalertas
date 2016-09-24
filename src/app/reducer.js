import { TOGGLE_DRAWER_ACTIVE, TOGGLE_DRAWER_PINNED } from './actions';

const initialState = {
	drawerActive: false,
	drawerPinned: false
};

export default function app( state = initialState, action = {} ) {
	switch (action.type) {
		case TOGGLE_DRAWER_ACTIVE:
			return {
				...state,
				drawerActive: !state.drawerActive
			}
			break;

		case TOGGLE_DRAWER_PINNED:
			return {
				...state,
				drawerPinned: !state.drawerPinned
			}
		default:
			return state;
			break;

	}
}
