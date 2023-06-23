import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { createI18nStore } from 'svelte-i18next';

i18next.use(LanguageDetector).init({
	detection: {
		caches: ['localStorage']
	},
	debug: false,
	fallbackLng: "en",
	resources: {
		en: {
			translation: {
				home: {
					title: 'Welcome!',
					introduction:
						'werkkasten_ is your repository of free and reactive tools, right here in your browser!'
				},
				navigation: {
					tools: 'Browse Tools',
					datasette: 'Your Datasette',
					settings: 'Settings',
					about: 'About werkkasten_'
				},
				tools: {
					common: {
						reportIssue: 'Report Issue',
						clearText: 'Cleartext',
						cypherText: 'Cyphertext',
						categorizedUnder: 'Categorized under {{category}}',
						use: 'Use {{tool}}',
						'utf-8': 'Text (UTF-8)',
						additionalLinks: 'More about this topic'
					},
					crypto: {
						rot: {
							name: 'ROT-N',
							offset: 'Rotation',
							outOfRange:
								'Your input includes non-alphabet characters. Those characters have been copied.',
							description:
								'The ROT-cipher, also commonly referred to as the Caesar-cipher, is based on the idea of ofsetting every letter of the alphabet by a certain amount, i.e. A => +13 => N'
						}
					},
					encodings: {
						base64: {
							name: 'Base64',
							base64: 'Base64',
							description:
								'Base64-encoding is commonly used for storing arbitrary binary data in pure strings, by mapping it to 64 ASCII characters.'
						},
						linuxpermissions: {
							name: 'Linux File-Permissions',
							octal: 'Ocatal-Value',
							umask: 'Umask-Value',
							bits: 'Permission-Bits',
							description:
								'Linux (or other UNIX-ish systems) use 4 groups of 3 bits to represent basic file permissions. The first group sets the flags set UID, set GID, and sticky. The last three groups set the file-permissions for the owner user, the owner group, and everyone else in that order. Here the 3 bits stand for read, write, and execute. On directories execute stands for open / navigate into.'
						},
						urlencode: {
							name: 'URL-Encoding',
							encoded: 'URL-Encoded',
							malformed: "The URL-Encoded string you've input is malformed.",
							isComponent: 'Should this be encoded for use as a component? (eg. in a query string)',
							description:
								'Encode and decode strings to and from URL-encoding (or Percent-encoding).'
						}
					},
					numbers: {
						base: {
							name: 'Base Converter',
							2: 'Binary',
							8: 'Octal',
							10: 'Decimal',
							16: 'Hexadecimal',
							description: 'Convert between decimal, binary, octal and hexadecimal numbers.'
						}
					},
					networking: {
						common: {
							ipv4addr: 'IPv4-Address',
							subnetMask: 'Subnet-Mask',
							firstAddr: 'First Address',
							lastAddr: 'Last Address',
							netAddr: 'Network Address',
							broadcastAddr: 'Broadcast Address',
							binary: 'Binary'
						},
						ipv4subnetting: {
							name: 'IPv4 Subnetter',
							description:
								'The IPv4 subnetter visualizes IPv4 subnets and calculates the first and last address from a CIDR-notated subnet.'
						}
					}
				},
				categories: {
					crypto: {
						name: 'Cryptography'
					},
					encodings: {
						name: 'Encodings'
					},
					numbers: {
						name: 'Numbers'
					},
					networking: {
						name: 'Networking'
					}
				},
				filter: {
					category: 'Category: {{category}}'
				},
				about: {
					title: 'About werkkasten_',
					paragraphs: [
						'werkkasten_ is my collection of useful small tools. Feel free to look through them to see if there anything is of use to you!',
						'There will be more tools added over time as I create them, so check back regularly to learn about new tools!'
					],
					more: 'More By Me',
					websiteCta: 'Check out my website to explore more of my projects!'
				},
				settings: {
					title: 'Settings',
					language: 'Language'
				},
				pwa: {
					offlineReady: 'werkkasten_ is now available for offline use!',
					newContent: 'New content is available.',
					updateNow: 'Update now'
				},
				generic: {
					close: 'Close'
				}
			}
		},
		de: {
			translation: {
				home: {
					title: 'Willkommen!',
					introduction:
						'werkkasten_ ist deine Quelle für freie und reaktive Werkzeuge, direkt hier in deinem Browser!'
				},
				navigation: {
					tools: 'Werkzeuge erkunden',
					datasette: 'Your Datasette',
					settings: 'Einstellungen',
					about: 'Über werkkasten_'
				},
				tools: {
					common: {
						reportIssue: 'Fehler melden',
						clearText: 'Entschlüsselt',
						cypherText: 'Verschlüsselt',
						categorizedUnder: 'Kategorisiert unter {{category}}',
						use: '{{tool}} verwenden',
						'utf-8': 'Text (UTF-8)',
						additionalLinks: 'Mehr zu diesem Thema'
					},
					crypto: {
						rot: {
							name: 'ROT-N',
							offset: 'Rotation',
							outOfRange:
								'Deine Eingabe beinhaltet nicht-alphabetische Zeichen. Diese wurden unverändert kopiert.',
							description:
								'Die ROT-Chiffre, auch oft als Caesar-Verschlüsselung bezeichnet, funktioniert indem jeder Buchstabe eines Textes um eine bestimmte Zahl verschoben wird, i.e. A => +13 => N'
						}
					},
					encodings: {
						base64: {
							name: 'Base64',
							base64: 'Base64',
							description:
								'Base64-Kodierung wird häufig verwendet um belibige Binärdaten in eine einfache Zeichenfolge zu verwandeln, indem sie auf 64 ASCII-Zeichen projeziert werden.'
						},
						linuxpermissions: {
							name: 'Linux Datei-Berechtigungen',
							octal: 'Okatal-Wert',
							umask: 'Umask-Wert',
							bits: 'Berechtigungs-Bits',
							description:
								'Linux (oder andere UNIX-artige Systeme) nutzen 4 Gruppen von je 3 Bits um einfache Dateiberechtigungen darzustellen. Die erste Gruppe umfasst die Flags set UID, set GID, und sticky. Die weiteren 3 Gruppen stellen in Reihenfolge die Berechtigunen für den Besitzer, die Besitzergruppe, und alle anderen dar. Hier stehen die 3 Bits jeweils für Lesen, Schreiben, and Ausführen. Bei Verzeichnissen steht Ausführen für das Öffnen.'
						},
						urlencode: {
							name: 'URL-Kodierung',
							encoded: 'URL-Kodiert',
							malformed: 'Deine URL-Kodierte Eingabe ist fehlerhaft.',
							isComponent:
								'Soll dies für eine Komponente kodiert werden? (z.B. einen Query-String)',
							description:
								'Kodiere und dekodiere Zeichenketten in URL-Kodierung (oder Prozent-Kodierung).'
						}
					},
					numbers: {
						base: {
							name: 'Basis Konverter',
							2: 'Binär',
							8: 'Oktal',
							10: 'Dezimal',
							16: 'Hexadezimal',
							description: 'Konvertiere zwischen Dezimal, Binär, Oktal and Hexadezimal numbers.'
						}
					},
					networking: {
						common: {
							ipv4addr: 'IPv4-Adresse',
							subnetMask: 'Subnetz-Maske',
							firstAddr: 'Erste Adresse',
							lastAddr: 'Letzte Adresse',
							netAddr: 'Netzwerkadresse',
							broadcastAddr: 'Broadcastadresse',
							binary: 'Binär'
						},
						ipv4subnetting: {
							name: 'IPv4 Subnetter',
							description:
								'Der IPv4 Subnetter visualisiert IPv4-Subnetze und berechnet die erste und letzte Addresse aus einem CIDR-Notierten Subnetz.'
						}
					}
				},
				categories: {
					crypto: {
						name: 'Kryptographie'
					},
					encodings: {
						name: 'Kodierungen'
					},
					numbers: {
						name: 'Nummern'
					},
					networking: {
						name: 'Netzwerke'
					}
				},
				filter: {
					category: 'Kategorie: {{category}}'
				},
				about: {
					title: 'Über werkkasten_',
					paragraphs: [
						'werkkasten_ ist meine Kollektion aus kleinen, nützlichen Werkzeugen. Schau dich gerne um, und vielleicht findest du etwas nützliches!',
						'Ich werde mehr Werkzeuge hinzufügen, also schau gerne öfter vorbei um neue Inhalte zu entdecken!'
					],
					more: 'Mehr von mir',
					websiteCta: 'Schau auf meiner Website vorbei um mehr Projekte zu erkunden!'
				},
				settings: {
					title: 'Einstellungen',
					language: 'Sprache'
				},
				pwa: {
					offlineReady: 'werkkasten_ ist jetzt bereit für Offline-Verwendung.',
					newContent: 'Neue Inhalte verfügbar.',
					updateNow: 'Jetzt aktualisieren'
				},
				generic: {
					close: 'Schließen'
				}
			}
		}
	},
	interpolation: {
		escapeValue: false // not needed for svelte as it escapes by default
	}
});

const i18n = createI18nStore(i18next);

export default i18n;
