import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Link } from "react-router-dom";
// import graph from "../../assets/graph.png";

import styles from "./Card.module.css";

const useStyles = makeStyles({
	root: {
			"& .MuiSvgIcon-root": {
				color: 'white',
				width: 20,
				height: 20
			},
			'& .MuiSvgIcon-root:hover':{
				color: 'white',
				transition: 'rotate(360deg)',
    		// : 'rotate(360deg)'
			},
			["@media (min-width: 180px) and (max-width: 360px)"]: {
				margin: "33px 0px 33px 0px",
			},
		 	margin: "33px 19px 34px 11px",
    	width: "230px",
			
			height: 100,
    	// boxShadow: "0 0px 7px 2px rgb(0 0 0 / 15%)",
		["@media (max-width: 768px)"]: {
			maxWidth: "45%",
    		flex: "0 0 50%",
		},
		["@media (max-width: 540px)"]: {
			maxWidth: "100%",
    		flex: "100%",
		},
		["@media (max-width: 320px)"]: {
			maxWidth: "100%",
    		flex: "100%",
		},
	},
});

export default function SimpleCard(props) {
	const classes = useStyles();

	return (
		<Card style={{backgroundColor: props.color}} className={classes.root}>
			<CardContent className={styles.card}>
				<div style={{display: 'flex', justifyContent: 'space-between'}}>
					<div style={{display: 'flex', flexDirection: 'column'}}>
					<div style={{color: 'white'}} className={styles.title}>{props.title}</div>
						<div style={{color: 'white'}} className={styles.stats}>{props.number}</div>
					</div>
					{<img style={{width: 40,height: 40, opacity:0.2}}src={props.icon} />}
				</div>
				<div className={styles.details}>

					<div className={styles.image}>
						{props.title == 'Service Handled' || props.title=='In Process Services'  || props.title == "Today's Revenue" ?
						<div></div>: <Link to={props.link}>
							<div className={styles.arrow1} >
								<img  style={{width:'10px'}} src={props.arrow}></img>
								{/* {props.arrow} */}
							</div></Link>}
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
