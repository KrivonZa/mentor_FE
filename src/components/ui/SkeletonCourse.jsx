import { Skeleton, Space } from 'antd'
import React from 'react'

export const SkeletonCourse = () => {
    return (
        <div
            className="col-lg-4 col-md-6 d-flex align-items-stretch mb-4"
            data-aos="zoom-in"
            data-aos-delay="100"
            style={{ height: '495px' }}
        >
            <div className="course-item w-100">
                <div style={{ height: '200px', objectFit: 'cover', width: '100%' }}>

                </div>
                <div className="course-content d-flex flex-column justify-content-between"
                    style={{ height: '295px' }}
                >
                    <div>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <div className='d-flex w-75' style={{ gap: 5, overflowX: scroll }}>
                                <Skeleton.Button active={true} size='default' shape='square' block={false} />
                                <Skeleton.Button active={true} size='default' shape='square' block={false} />
                            </div>
                            <div className="price">
                                <Skeleton.Button active={true} size='small' shape='default' block={false} />
                            </div>
                        </div>

                        {/* Title Desc */}
                        <Skeleton
                            active={true}
                            title={true}
                            paragraph={{
                                rows: 3,
                            }}
                        />
                    </div>
                    <div className="trainer d-flex justify-content-between align-items-center">
                        <Skeleton
                            avatar={true}
                            paragraph={{
                                rows: 0,
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SkeletonCourse