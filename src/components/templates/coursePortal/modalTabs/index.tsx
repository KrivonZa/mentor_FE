import React, { useContext, useState } from 'react'
import CourseFormTab from './CourseFormTab';
import LessonFormTab from './LessonFormTab';
import { Tabs } from 'antd';
import { CoursePortalContext } from '../../../../modules/mainPage/CoursePortal';

const CourseModalTab = () => {
    const context = useContext(CoursePortalContext);
    if (!context) throw new Error("SomeComponent must be used within a CoursePortalProvider");

    const { activeKey, setActiveKey } = context;

    const tabItems = [
        {
            key: "1",
            label: "Course",
            children: (<CourseFormTab />),
            disabled: true,
        },
        {
            key: "2",
            label: "Lessons",
            disabled: true,
            children: (<LessonFormTab />)
        },
    ];

    return (
        <Tabs activeKey={activeKey} onChange={(key) => setActiveKey(key)} items={tabItems} />
    )
}

export default CourseModalTab