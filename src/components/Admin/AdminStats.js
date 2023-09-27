import React from 'react';
import {Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import {Card, CardContent, Grid, Typography} from '@mui/material';
import {useTheme} from '@mui/material/styles';


// mock data
const data = [
    {name: 'Jan', value: 2000},
    {name: 'Feb', value: 3000},
    {name: 'Mar', value: 5000},
    {name: 'Apr', value: 4000},
    {name: 'May', value: 3000},
    {name: 'Jun', value: 2000},
    {name: 'Jul', value: 4000},
    {name: 'Aug', value: 1000},
    {name: 'Sep', value: 4000},
    {name: 'Oct', value: 1000}
];


const Statistics = () => {
    const theme = useTheme();
    return (
        <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
                <Card elevation={3}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Data
                        </Typography>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={data}>
                                <XAxis dataKey="name"/>
                                <YAxis/>
                                <Tooltip/>
                                <Bar dataKey="value" fill={theme.palette.primary.main}/>
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={6}>
                <Card elevation={3}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Data
                        </Typography>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={data}>
                                <XAxis dataKey="name"/>
                                <YAxis/>
                                <Tooltip/>
                                <Bar dataKey="value" fill={theme.palette.primary.main}/>
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default Statistics;


