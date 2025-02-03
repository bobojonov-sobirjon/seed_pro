import React from 'react';

function PageNotFound() {
    return (
        <div className='flex items-center justify-center h-[60vh] lg:h-[80vh] flex-col leading-[60px] lg:leading-[100px] font-gilroy_medium'>
            <h1 className='text-[90px] lg:text-[150px] text-gray-700'>404</h1>
            <h1 className='text-[30px] lg:text-[60px] text-gray-700'>Страница не найдена</h1>
        </div>
    )
}

export default PageNotFound;