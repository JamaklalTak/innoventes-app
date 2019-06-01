import React, { Component } from 'react';

import Image from './Image';

import plusGrey from './plus-sign-in-a-grey-circle.svg';
import minusGrey from './minus-sign-in-a-grey-circle.svg';
import minus from './minus-sign-in-a-circle.svg';
import plus from './plus-sign-in-a-black-circle.svg';

class IncrementButtons extends Component {
	render() {
		const { id, baseCount, minCount, maxCount, decreaseMethod, increasedMethod } = this.props;
		let Minus = <Image
										id='minus-logo-id'
										className='icon minus-logo-class'
										clickedMethod={decreaseMethod}
										src={minus}
										alt='minus-logo-alt'
									/>;
		if(baseCount === minCount) {
			Minus = <Image
										id='minus-grey-logo-id'
										className='icon minus-grey-logo-class'
										src={minusGrey}
										alt='minus-grey-logo-alt'
									/>;
		}
		let Plus = <Image
										id='plus-logo-id'
										className='icon plus-logo-class'
										clickedMethod={increasedMethod}
										src={plus}
										alt='plus-logo-alt'
									/>;
		if(baseCount === maxCount) {
			Plus = <Image
									id='plus-grey-logo-id'
									className='icon plus-grey-logo-class'
									src={plusGrey}
									alt='plus-grey-logo-alt'
								/>;
			}							
		return (
			<React.Fragment>
						{Minus}
						<span id={id+'_count'}>{baseCount}</span>
						{Plus}
			</React.Fragment>
		);
	}
}

export default IncrementButtons;