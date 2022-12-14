import React, { useState } from 'react'
import { Button, Drawer, Radio, Space, Badge } from 'antd';
import Loading from '../loading'
import './index.css'
export default function MyDrawer() {
    const [visible, setVisible] = useState(false);
    const [childrenDrawer, setChildrenDrawer] = useState(false)
    const [page, setPage] = useState(1)
    const [load, setLoad] = React.useState(0)
    const [data, setData] = React.useState([])
    const [data2, setData2] = React.useState([1, 2, 3, 4])
    const [project, setProject] = React.useState({ name: '', url: '', desc: '', time: '' })

    const agreeOrrefuse = (type, applicationId) => {
        setLoad({ left: '10.2895vw', top: '5.75vw' })
        React.axios('post', 'http://39.98.41.126:31106/application/update', setLoad, '', { applicationId, number: type }, '', '', getData).then(
        )
    }
    const getData = () => {
        setData([])
        setLoad({ left: '10.2895vw', top: '5.75vw' })
        React.axios('get', 'http://39.98.41.126:31106/message/watch', setLoad).then(
            res => {
                setData(res)
            },
        )
    }
    const getData2 = () => {
        setData2([])
        setLoad({ left: '10.2895vw', top: '5.75vw' })
        React.axios('get', 'http://39.98.41.126:31106/application/MySend', setLoad).then(
            res => {
                console.log(res);
                setData2(res)
            },
        )
    }
    const showDrawer = () => {
        setVisible(true);
        getData()
    };
    const pageChange = (type) => {
        setPage(type)
        type ? getData() : getData2();
    }
    const onClose = () => {
        setVisible(false);
    };
    const showChildrenDrawer = (name, url, desc, time) => {
        setProject({ name, url, desc, time })
        setChildrenDrawer(true);
    };

    const onChildrenDrawerClose = () => {
        setChildrenDrawer(false);
    };
    const readed = (applicationId) => {
        setLoad({ left: '10.2895vw', top: '5.75vw' })
        React.axios('post', 'http://39.98.41.126:31106/application/deleteMySend', setLoad, '', { applicationId }, '', '', getData2).then(
        )
    }
    return (
        <>
            <Badge count='!' onClick={showDrawer}></Badge>
            <Drawer title={<div ><i onClick={() => pageChange(1)} className='drawerChange'>???????????? </i> &nbsp;<i onClick={() => pageChange(0)} className='drawerChange'>????????????</i></div>} placement="right" onClose={onClose} visible={visible}>
                {load ? <Loading {...load} /> : ''}
                {page ? data.length !== 0 ? data.map(i => {
                    if (i.status === 1) {
                        return (
                            <div key={i.appliId} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', borderBottom: '1px solid rgba(0,0,0,.1)', }}>
                                <div style={{ display: 'flex', height: '100%', width: '60%', }}>
                                    <i style={{ color: 'rgb(106, 183, 255)', cursor: 'pointer' }} onClick={() => showChildrenDrawer(i.projectName, i.projectUrl, i.projectDesc, i.registerDate)} >
                                        {i.appliType === 1 ? i.appiUser : i.projectName}</i>&nbsp;</div>
                                <i style={{ width: '180px', }}>{i.appliType === 1 ? '????????????????????????' : i.appliType === 3 ? '????????????????????????' : '????????????????????????'}</i>
                                <div style={{ display: 'flex' }}><i onClick={() => agreeOrrefuse('1', i.appliId)} style={{ width: '30px', color: 'rgb(93, 177, 255)', cursor: 'pointer' }}>??????</i>
                                    &nbsp;&nbsp;&nbsp;   <i onClick={() => agreeOrrefuse('-1', i.appliId)} style={{ width: '30px', color: 'rgb(93, 177, 255)', cursor: 'pointer' }}>??????</i></div>
                            </div>)
                    }
                }) : <p>????????????</p> : data2.length !== 0 ? data2.map(i => {
                    return (<div key={i.applicationId} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', borderBottom: '1px solid rgba(0,0,0,.1)', }}>
                        <div style={{ display: 'flex', height: '100%', width: '50%' }}>
                            <i >{i.type !== 2 ? '?????????:  ' + i.projectName : '?????????:  ' + i.userName}</i>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', width: '180px', }}>
                            <i style={{ width: '100%' }}>{i.type === 1 ? '?????????????????????' : i.type === 3 ? '?????????????????????' : '????????????????????????'}</i>
                            <i style={{ width: '100%' }}>??????:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Badge status={i.handle === 1 ? "success" : i.handle === -1 ? 'error' : 'default'} />{i.handle === 1 ? "?????????" : i.handle === -1 ? '?????????' : '?????????'}</i>
                        </div>
                        <div style={{ display: 'flex', width: '50px' }}><i onClick={() => readed(i.applicationId)} style={{ width: '30px', cursor: 'pointer' }}>&nbsp;&nbsp;&nbsp;X</i>
                        </div>
                    </div>)
                }) : <p>????????????</p>}
                <Drawer
                    title="????????????"
                    width={320}
                    closable={false}
                    onClose={onChildrenDrawerClose}
                    visible={childrenDrawer}
                >
                    <div ><strong>???????????????</strong>&nbsp;{project.time.replace('T', '  ')}</div>
                    <div style={{ marginTop: '10px' }}><strong>???????????????</strong>&nbsp;{project.name}</div>
                    <div style={{ marginTop: '10px' }}><strong>????????????:</strong> &nbsp; <a href={project.url}>{project.url}</a></div>
                    <div style={{ marginTop: '10px' }}><strong>????????????:</strong> &nbsp; {project.desc}</div>
                </Drawer>&nbsp;
            </Drawer>
        </>
    );
}
