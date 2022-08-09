import React, {ReactNode} from 'react';

interface IProps {
    children: ReactNode,
    isLoaded: any,
}

const Skeleton = ({children, isLoaded}: IProps ) => {

    return (
        <div className={'App'}>
            {isLoaded ? children : <div>
            </div>}
        </div>
    );
};

export default Skeleton;