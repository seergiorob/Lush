import * as React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Button } from '@mui/material';
import { connect } from 'react-redux';
import './Quiz.css';

import plantActions from '../../redux/actions/plantActions';
import { Link } from 'react-router-dom';

const questions = [
    {
        text: 'Where are you looking to put your plant?',
        options: [
            'Bedroom',
            'Kitchen',
            'Office',
            'Bathroom',
            'Living Room',
            'No preference',
        ]
    },
    {
        text: 'How much natural light does your space get?',
        options: [
            'Quite a lot',
            'Not much',
        ]
    },
    {
        text: 'Are you a serial plant killer?',
        options: [
            'Call the plant police',
            'Not too bad actually',
            'I\'m a plant lover'
        ]
    },
    {
        text: 'Water?',
        options: [
            'poca',
            'mucha!'
        ]
    },
    {
        text: 'Size?',
        options: [
            'Small',
            'Medium',
            'Large'
        ]
    }
];

function Quiz(props) {
    const [question, setQuestion] = React.useState(-1);
    const [answers, setAnswers] = React.useState([]);
    function finalizeQuiz() {
        let room = new Set([answers[0].option.toLowerCase()]);
        let ratio = 1 / questions[1].options.length;
        let lightRatio = answers[1].index * ratio;
        lightRatio = [lightRatio * 100, (lightRatio + ratio) * 100];
        ratio = 1 / questions[2].options.length;
        let careRatio = answers[2].index * ratio;
        careRatio = [Math.round(careRatio * 100), Math.round((careRatio + ratio) * 100)];
        ratio = 1 / questions[3].options.length;
        let waterRatio = answers[3].index * ratio;
        waterRatio = [waterRatio * 100, (waterRatio + ratio) * 100];
        let size = new Set([answers[4].option.toLowerCase()]);
        props.filterPlants({
            careRatio,
            lightRatio,
            waterRatio,
            minPrice: '',
            maxPrice: '',
            size,
            room,
        });
    }
    return (
        <Box sx={{ flexGrow: 1 }} className='mainBox'>
            <Grid container spacing={{ md: 3 }} columns={{ md: 12 }} className='mainBox2' sx={{ borderRadius: 2, height: 500 }}>
                {
                    question === -1 ? (
                        <Grid item md={12} className='grid1' sx={{ height: 500, borderRadius: 2 }}>
                            <h2>What's Plants are Best for You?</h2>
                            <Button onClick={() => setQuestion(question + 1)} variant="contained" color="success">
                                Start
                            </Button>
                        </Grid>
                    ) : question < questions.length ? (
                        <>
                            <Grid item md={5} className='grid_question'>
                                {questions[question].text}
                            </Grid>
                            <Grid item md={7} className='grid_plant1'>
                                <Grid container spacing={{ md: 3 }} columns={{ md: 12 }} className='gridPlant'>
                                    {questions[question].options.map((option, index) => (
                                        <Grid item md={questions.length % 3 == 0 ? 4 : 6} key={index} className='grid_plant2'>
                                            <Card onClick={() => {
                                                setAnswers([...answers, { index, option }]);
                                                setQuestion(question + 1);
                                            }} className='grid_plant3' sx={{ borderRadius: 2, width: 150, marginTop: 2 }}>
                                                <CardActionArea className='mainSquare'>
                                                    <CardContent className='square' id="squareid1">
                                                        <Typography variant="body2" color="text.secondary" className='typo'>
                                                            {option}
                                                        </Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                            </Card>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Grid>
                        </>
                    ) : (
                        <>
                            <Link onClick={finalizeQuiz} to="/Shop">Descubre estas plantas para ti</Link>
                        </>
                    )
                }
            </Grid>
        </Box >
    );
}

export default connect(null, plantActions)(Quiz);