<script setup lang="ts">
</script>
<template>
    <div class="cards">
	
	<div class="contact " >Contact Me</div>
	<div class="contact-form">
		<a href="#" class="close"><i class="fa fa-times"></i></a>
		<form>
			<div class="control"><input type="text"  id="name"/><label for="name">Your Name</label></div>
			<div class="control"><input type="text"  id="email"/><label for="email">Email Address</label></div>
			<div class="control"><input type="text"  id="url"/><label for="url">Website</label></div>
			<div class="control"><textarea name="" id="message"></textarea><label for="message">Message</label></div>
			<div class="control submit"><input type="submit" /></div>
		</form>
	</div>
	
	 <div class="card active" id="overview">
		<a class="card-toggle"><i class="fa fa-arrow-circle-left"></i></a>
		<div class="card-content">
			<div class="row">
				<div class="left col">
					<h2>Personal <strong>Social Card</strong></h2>
					
					<p>Click one of the social icons below to switch between card or click Contact Me link to show the contact form card. <br /><em>Make sure you're running this experiment in the latest Chrome browser.</em></p>
					
				</div>
				<div class="right col">
				</div>
			</div>
		</div>
	</div> 
	

	<div class="card" id="dribbble">
		<a class="card-toggle"><i><span class="fa fa-dribbble"></span></i></a>
		<div class="card-content">
			<div class="row">
				<div class="left col">
					<h2>My <strong>Dribbble</strong></h2>
					
					<p>In ipsa reiciendis, eligendi labore dolores delectus facere perferendis ex architecto reprehenderit maxime exercitationem, libero itaque, at voluptatibus! Sit obcaecati repellat incidunt accusantium voluptas suscipit a consequuntur repudiandae nulla eius.</p>
					
				</div>
				<div class="right col"><img src="https://dl.dropboxusercontent.com/u/26808427/cdn/preview.jpg" alt="" /></div>
			</div>
		</div>
	</div> 
	
	<div class="card" id="behance">
		<a class="card-toggle"><i><span class="fa fa-behance"></span></i></a>
		<div class="card-content">
			<div class="row">
				<div class="left col">
					<h2>My <strong>Behance</strong></h2>
					<p>Quia fugit animi, iure error veritatis? Ipsa quis, deserunt illum culpa ab id mollitia nesciunt commodi aut dolores vero ipsam ut minima neque nam excepturi corporis obcaecati consequuntur accusantium laborum!</p>
				</div>
				<div class="right col"><img src="https://dl.dropboxusercontent.com/u/26808427/cdn/preview.jpg" alt="" /></div>
			</div>
		</div>
	</div>
	<div class="card" id="linkedin">
		<a class="card-toggle"><i><span class="fa fa-linkedin"></span></i></a>
		<div class="card-content">
			<div class="row">
				<div class="left col">
					<h2>My <strong>LinkedIn</strong></h2>
				
					<p>Voluptas aliquam, perferendis laboriosam, cumque, autem vero pariatur dolorum tempora sint hic laborum distinctio suscipit magnam, porro provident maxime labore. Porro vel error quaerat consequatur sapiente? Nostrum at voluptatibus necessitatibus.</p>
				</div>
				<div class="right col"><img src="https://dl.dropboxusercontent.com/u/26808427/cdn/preview.jpg" alt="" /></div>
			</div>
		</div>
	</div>
	<div class="card" id="twitter">
		<a class="card-toggle"><i><span class="fa fa-twitter"></span></i></a>
		<div class="card-content">
			<div class="row">
				<div class="left col">
					<h2>My <strong>Twitter</strong></h2>
				
					<p>Fugit veniam, animi architecto doloribus veritatis vitae sint doloremque possimus quae. Pariatur libero, veniam voluptatibus alias distinctio qui nostrum debitis voluptate amet hic repellat officiis nam quos vel doloremque praesentium.</p>
				</div>
				<div class="right col"><img src="" alt="" /></div>
			</div>
		</div>
	</div>
	
	
</div>
</template>

<style lang="scss" scoped>
@import url(https://fonts.googleapis.com/css?family=Open+Sans:400,300,700);
*{
	box-sizing: border-box;
}
body{
	min-height: 100vh;
	display: flex;
	background-color: #eaeaea;
	font-family: Open Sans;
	font-weight: 300;
	line-height: 1.8;
	background-size: cover;
	background-repeat: no-repeat;
}
.contact{
	position: absolute;
	top: 30px;
	left: 50px;
	z-index: 6;
	color: rgba(0,0,0,.5);
	text-transform: uppercase;
	letter-spacing: 3px;
	font-size: 12px;
	font-weight: 700;
	padding: 5px 15px;
	border-radius: 20px;
	background: rgba(0,0,0,.1);
	line-height: 1;
	cursor: pointer;
	text-shadow: 0 1px 0px rgba(255,255,255,.1);
	
	&-form{
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		background: white;
		z-index: 5;
		padding: 80px 50px;
		transform: translate3d(-100%, 0, 0);
		transition: .3s ease;
		border-radius: 5px;
		
		&.active{
			transform: translate3d(0,0,0);
		}
		
		.close{
			color: rgba(0,0,0,.7);
			position: absolute;
			right: 30px;
			top: 30px;
		}
	}
}

.cards{
	margin: auto;
	background: #fefefe;
	border-radius: 5px;
	overflow: hidden;
	box-shadow: 0 2px 10px rgba(0,0,0,.1), 3px 5px 20px rgba(0,0,0,.2);
	width: 800px;
	height:800px;
	position: relative;
	display: flex;
	align-items: flex-end;
	padding: 30px;
	margin-top: 50px;
	
	.card{
		display: inline-block;
		margin-right: 20px;
	}
	
	.card-toggle{
		z-index: 4;
		position: relative;
		width: 48px;
		height: 48px;
		border-radius: 50%;
		display: block;
		text-align: center;
		line-height: 1.8;
		font-size: 24px;
		cursor: pointer;
		border: 2px solid transparent;
		transition: .3s ease;
		
		&.active{
			color: white;
			border-color: white;
		}
	}
	.card-content{
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		transition: -webkit-clip-path 1s ease;
		padding: 100px 0 0;
		overflow: hidden;
		border-radius: 5px;
		
		.row{
			display: table;
			width: 100%;
			height: 100%;
		}
		
		.col{
			width: 50%;
			height: 100%;
			display: table-cell;
			transition: .3s ease .3s;
			transform: translate3d(0,0,0);
			vertical-align: top;
			
			h2{
				font-weight: 300;
				font-size: 3em;
				line-height: 1;
				margin: 0 0 30px;
				strong{
					font-weight: 700;
					display: block;
				}
			}
			
			img{
				max-width:90%;
				width: 100%;
			}
			
			&.left{
				transform: translate3d(0,0, 0);
				opacity: 0;
				padding-left: 50px;
			}
			&.right{
				transform: translate3d(100px,0, 0);
				opacity: 0;
				padding-left: 30px;
			}
		}
	}
	.card.active .col{
		transform: translate3d(0,0,0);
		opacity: 1;
	}
	#overview{
		.card-toggle{
			position: absolute;
			top: 30px;
			right: 30px;
			opacity:1;
			color: white;
		}
		.card-content{
			background-color: #efefef;
			-webkit-clip-path: circle(0% at 91.5% 75px);
		}
		&.active {
			.card-toggle{opacity: 0}
			.card-content{
				-webkit-clip-path: circle(270% at 91.5% 75px);
			}
		}
		
		.right{
			background: url(https://dl.dropboxusercontent.com/u/26808427/cdn/james.png) no-repeat bottom right;
			background-size: contain;
		}
	}
	
	#dribbble, #behance, #linkedin, #twitter{
		.card-content{
			color: white;
			
			p{
				color: rgba(255,255,255,.8);
			}
		}
	}
	#dribbble{ 
		.card-content{ 
			background-color: #F46899;
			-webkit-clip-path: circle(0% at 76px 88%);
			clip-path: circle(0% at 50px 88%);
	
		}
		&.active .card-content{
			-webkit-clip-path: circle(270% at 76px 88%);
			clip-path: circle(270% at 50px 88%);
		}
	}
	#behance {
		.card-content{ 
			background-color: #2F98D1;
			-webkit-clip-path: circle(0% at 150px 88%);
			clip-path: circle(0% at 150px 88%);
	
		}
		&.active .card-content{
			-webkit-clip-path: circle(270% at 150px 88%);
			clip-path: circle(270% at 150px 88%);
		}
	}
	#linkedin {
		.card-content{ 
			background-color: #03679B;
			-webkit-clip-path: circle(0% at 220px 88%);
			clip-path: circle(0% at 220px 88%);
	
		}
		&.active .card-content{
			-webkit-clip-path: circle(270% at 220px 88%);
			clip-path: circle(270% at 220px 88%);
		}
	}
	#twitter {
		.card-content{ 
			background-color: #7FD0ED;
			-webkit-clip-path: circle(0% at 292px 88%);
			clip-path: circle(0% at 292px 88%);
	
		}
		&.active .card-content{
			-webkit-clip-path: circle(270% at 292px 88%);
			clip-path: circle(270% at 292px 88%);				
		}
	}
}

form{
	.control{
		position: relative;
		margin-bottom: 10px;
		padding-top: 20px;
		label{
			position: absolute;
			top: 30px;
			left: 0;
			transition: .3s ease;
			text-transform: uppercase;
			font-weight: 600;
			letter-spacing: 2px;
			font-size: 14px;
		}
		
		&.submit{
			text-align: right;
		}
	}
	input, textarea{
		width: 100%;
		border: none;
		border-bottom: 1px solid #e3e3e3;
		outline: none;
		padding: 10px 0;
		
	}
	.filled label,input:focus + label,textarea:focus +label{

		top: 0;
		font-size: 12px;

	}
	textarea{
		height: 100px;
		
	}
	input[type="submit"]{
		width: auto;
		background-color: #F06292;
		padding: 10px 40px;
		color: white;
		border-radius: 40px;
	}
}
</style>