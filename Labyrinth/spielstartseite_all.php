<!DOCTYPE HTML>
<html>
	<head> <!-- entsprechend des spiels wird der titel als head verknüpft-->
		<?php	 
			switch($game_title){
					case("Dart"): 
						include(head_darts.php);
						break;
					case("Farben"): 
						include(head_farben.php);
						break;
					case("Mastermind"): 
						include(head_mastermind.php);
						break;
					case("Puzzle"): 
						include(head_puzzle.php);
						break;
					case("Quiz"): 
						include(head_quiz.php);
						break;
					case("Spaceinvaders"): 
						include(head_spaceinvaders.php);
						break;
					case("Snake"): 
						include(head_snake.php);
						break;
		?>
	</head>
	<body>
		<header> <!-- hier wird der Banner über die php Datei auf allen Starspielseiten angezeigt-->
			<?php
				include(header_all.php);
			?>			
		<header/>
		<main>		<!-- hier wird der main-container entsprechend des spiels verknüpft, in dem Anleitungen und Hinweise stehen und zur Spielseite verlinkt wird-->
			<?php
				switch($game_title){
					case("Dart"): 
						include(main_darts.php);
						break;
					case("Farben"): 
						include(main_farben.php);
						break;
					case("Mastermind"): 
						include(main_mastermind.php);
						break;
					case("Puzzle"): 
						include(main_puzzle.php);
						break;
					case("Quiz"): 
						include(main_quiz.php);
						break;
					case("Spaceinvaders"): 
						include(main_spaceinvaders.php);
						break;
					case("Snake"): 
						include(main_snake.php);
						break;
				}				
			?>
		</main>
	</body>
</html>