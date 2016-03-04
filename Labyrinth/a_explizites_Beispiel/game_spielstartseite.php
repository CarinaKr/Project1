<!DOCTYPE HTML>
<html>
	<head>
		<?php include(allHeaders.php); ?>
		<title>
			<?php echo($game_title); ?>
		</title>
	</head>
	<body>
		<header>
		<?php
			switch($game_title){
				case("Dart"): 
					include(header_darts.php);
					break;
				case("Farben"): 
					include(header_farben.php);
					break;
				?>
				
				<!--
				=== Feedback Alpers, Mär. 04 ===
				
				Alles weiter an dieser Stelle sollte klar sein.
				
				=== Feedback Alpers, Ende ===
				-->
				
				<?php
			}
		?>
		</header>
		<main>
			<?php
				include(main_all.php);
				switch($game_title){
					case("Dart"):
						include(main_dart.php);
						break;
					case("Farben"):
						include(main_farben.php);
					?>
					
					<!--
						=== Feedback Alpers, Mär 04 ===
						
						Und auch hier sollte der Rest klar sein.
						
						=== Feedback Alpers, Ende ===
					-->
					
					<?php
				}
				include(main_all_finals.php);
			?>
		</main>
	</body>
</html>

<!--
=== Feedback Alpers, Mär 04 ===

Das hier soll als Beispiel dafür dienen, wie Sie effizient programmieren können.
Sie können das so nicht direkt übernehmen, sondern müssen noch einiges ergänzen,
bzw. anpassen.

Adaptieren Sie das bitte für das gesamte Projekt in den einzelnen Dateien entsprechend.

Als Hinweis: Jede Zeile, die mehrfach in verschiedenen Dateien eingebunden wird
sollte nur einmal programmiert werden.

Wenn Sie sich jetzt fragen, wieso Sie das so machen sollen, dann denken Sie
bitte daran, dass Sie zwar den HTML-Teil programmieren sollen, dass Sie 
mit den Kommilitonen Ihres Teams zusammen arbeiten sollten.
Und wenn wie hier mittels PHP eine einfache Auslagerung möglich ist,
bei der im Grunde nicht einmal die Unterstützung vom PHPler nötig ist,
dann sollten Sie die selbstverständlich auch nutzen. Genau darum gehts bei
der Teamarbeit.

Und wenn Sie momentan nicht wissen, wie Sie bei einer Verlinkung einen Wert übergeben
sollen, dann macht das nichts, denn Ihre Aufgabe als HTML'erin besteht ausschließlich
darin, die Struktur der Webanwendung zu programmieren.

=== Feedback Alpers, Ende ===
-->