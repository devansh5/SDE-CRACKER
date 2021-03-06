import React, { useEffect, useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import firebase from "../../services/firebase";
import QuestionTable from "../QuestionTable/QuestionTable";
import { Avatar, CircularProgress, Fab } from "@material-ui/core";
import { UserContext } from "../../providers/UserProvider";
import { ArrowBackIos } from "@material-ui/icons";
var quotes = require("../../quotes.json");

export default function Daygrid() {
  const [question, setQuestion] = useState([]);
  const [showQuestion, setshowQuestion] = useState(false);
  const user = useContext(UserContext);
  const [dayIndex, setdayIndex] = useState(null);
  const [dayDone, setdayDone] = useState([]);
  const [list, setlist] = useState([]);
  const text = quotes[Math.floor(Math.random() * (190 - 2 + 1)) + 2]?.text;

  useEffect(() => {
    getalldata();
  }, []);

  async function getalldata() {
    const snapshot = await firebase
      .firestore()
      .collection("Questions")
      .doc("57b0fbc0-46df-11eb-9967-ef1150090e32")
      .get();
    let data = snapshot.data()["question"];
    var result = Object.keys(data).map((key) => [data[key]]);
    setQuestion(result.sort());
  }


  //questionlist
  const questionset = (data, index) => {
    setshowQuestion(true);
    setlist(data);
    setdayIndex(index);
  };

  const classes = useStyles();

  return (
    <div>
      {question.length ? (
        <div>
          {!showQuestion ? (
            <>
              <div className={classes.title}>
                <span>SDE_CHALLENGE(DAYS 30);</span>
                <span className={classes.quotes}> "{text}" </span>
              </div>
              <Timeline align="alternate" className={classes.Timeline}>
                {question?.map((data, index) => {
                  return (
                    <TimelineItem
                      key={index}
                      onClick={() => questionset(data[0], index)}
                    >
                      <TimelineSeparator>
                        <TimelineDot>
                          <Avatar className={classes.lettericon}>
                            {index + 1}
                          </Avatar>
                        </TimelineDot>
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent>
                        <Paper elevation={3} className={classes.paper}>
                          <Typography variant="h6" component="h1">
                            Day {index + 1}
                          </Typography>
                          <Typography className={classes.truncate}>
                            {data[0][0].substring(2)}
                          </Typography>
                        </Paper>
                      </TimelineContent>
                    </TimelineItem>
                  );
                })}
              </Timeline>
              <div className={classes.congo}>
                <span>
                  🎉🎉Hurrah!! You are ready for your placement after a month of
                  hard-work without a cheat day 🚀🚀.
                </span>
              </div>
            </>
          ) : (
            <div className={classes.QuestionTable}>
              <Fab
                color="secondary"
                variant="extended"
                onClick={() => setshowQuestion(false)}
              >
                <ArrowBackIos className={classes.extendedIcon} />
                Back
              </Fab>
              <QuestionTable index={dayIndex} data={list} />
            </div>
          )}
        </div>
      ) : (
        <div className={classes.loader}>
          <CircularProgress />
        </div>
      )}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "6px 16px",
    borderRadius: "0px 30px 0px 30px",
    backgroundColor: "#f50057",
    color: "white",
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
  Timeline: {
    cursor: "pointer",
  },
  QuestionTable: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 20,
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  loader: {
    display: "flex",
    justifyContent: "center",
    marginTop: 285,
  },
  title: {
    margin: 20,
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    fontSize: "32px",
    ["@media (max-width:420px)"]: {
      fontSize: "22px",
    },
  },
  quotes: {
    fontSize: 10,
    margin: 5,
    color: "grey",
  },
  lettericon: {
    backgroundColor: "white",
    color: "#f50057",
    fontWeight: "bold",
  },
  truncate: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    ["@media (max-width:420px)"]: {
      maxWidth: "65px",
    },   
  },
  congo: {
    textAlign: 'center',
    padding: 10,
    fontSize: 14

  },
}));
