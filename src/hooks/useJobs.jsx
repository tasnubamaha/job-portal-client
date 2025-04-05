import React, { useEffect, useState } from 'react';

const useJobs = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {

    }, [])

    return [jobs, setJobs]

};

export default useJobs;