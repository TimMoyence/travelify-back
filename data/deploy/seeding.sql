BEGIN;

INSERT INTO "user" (firstname, lastname, email, address, password, birth_date, gender, profile_picture, profile_desc)
VALUES
    ('Marie', 'Lefort', 'marie.lefort@example.com', '333 Rue des Arbres, Ville', 'motdepasse10', '1995-02-08 10:30:00', 'Femme', 'http://localhost:3000/static/default.webp', 'Description de Marie Lefort.'),
    ('Thomas', 'Gagnon', 'thomas.gagnon@example.com', '777 Avenue du Soleil, Ville', 'supersecret10', '1994-12-15 16:45:00', 'Homme', 'http://localhost:3000/static/default.webp', 'Description de Thomas Gagnon.');

INSERT INTO event (name, owner_id, status, description, picture, password)
VALUES
    ('Conférence Tech 2023', 1, true, 'Conférence annuelle sur la technologie', 'http://localhost:3000/static/default.webp', 'motdepasse1'),
    ('Festival de Musique', 1, true, 'Festival de musique de trois jours', 'http://localhost:3000/static/default.webp', 'motdepasse2'),
    ('Gala de Bienfaisance', 1, false, 'Gala de collecte de fonds pour une bonne cause', 'http://localhost:3000/static/default.webp', 'motdepasse3'),
    ('Lancement de Produit', 1, true, 'Événement de lancement de notre nouveau produit', 'http://localhost:3000/static/default.webp', 'motdepasse4'),
    ('Atelier Communautaire', 1, true, 'Atelier pratique pour les amateurs de bricolage', 'http://localhost:3000/static/default.webp', 'motdepasse5');

    INSERT INTO userchoice (start_date_choice, end_date_choice, user_id, event_id)
VALUES
    ('2023-11-05 14:30:00', '2023-11-05 14:30:00', 1, 1),
    ('2023-11-05 14:30:00', '2023-11-05 14:30:00', 2, 1),
    ('2023-11-05 14:30:00', '2023-11-05 14:30:00', 1, 1),
    ('2023-11-08 14:30:00', '2023-11-09 14:30:00', 2, 1),
    ('2023-11-08 14:30:00', '2023-11-09 14:30:00', 1, 1),
    ('2023-11-10 14:30:00', '2023-11-10 14:30:00', 2, 1),
    ('2023-11-10 14:30:00', '2023-11-10 14:30:00', 1, 1),
    ('2025-11-05 14:30:00', '2025-11-05 14:30:00', 1, 2),
    ('2025-11-05 14:30:00', '2025-11-05 14:30:00', 2, 2),
    ('2025-11-05 14:30:00', '2025-11-05 14:30:00', 1, 2),
    ('2025-11-08 14:30:00', '2025-11-09 14:30:00', 2, 2),
    ('2025-11-08 14:30:00', '2025-11-09 14:30:00', 1, 2),
    ('2025-11-10 14:30:00', '2025-11-10 14:30:00', 2, 2),
    ('2025-11-10 14:30:00', '2025-11-10 14:30:00', 1, 2),
    ('2025-11-05 14:30:00', '2026-11-05 14:30:00', 1, 3),
    ('2025-11-05 14:30:00', '2026-11-05 14:30:00', 2, 3),
    ('2025-11-05 14:30:00', '2026-11-05 14:30:00', 1, 3),
    ('2025-11-08 14:30:00', '2026-11-09 14:30:00', 2, 3),
    ('2025-11-08 14:30:00', '2026-11-09 14:30:00', 1, 3),
    ('2025-11-10 14:30:00', '2026-11-10 14:30:00', 2, 3),
    ('2025-11-10 14:30:00', '2026-11-10 14:30:00', 1, 3),
    ('2027-11-05 14:30:00', '2027-11-05 14:30:00', 1, 4),
    ('2027-11-05 14:30:00', '2027-11-05 14:30:00', 2, 4),
    ('2027-11-05 14:30:00', '2027-11-05 14:30:00', 1, 4),
    ('2027-11-08 14:30:00', '2027-11-09 14:30:00', 2, 4),
    ('2027-11-08 14:30:00', '2027-11-09 14:30:00', 1, 4),
    ('2027-11-10 14:30:00', '2027-11-10 14:30:00', 2, 4),
    ('2027-11-10 14:30:00', '2027-11-10 14:30:00', 1, 4),
    ('2028-11-05 14:30:00', '2028-11-05 14:30:00', 1, 5),
    ('2028-11-05 14:30:00', '2028-11-05 14:30:00', 2, 5),
    ('2028-11-05 14:30:00', '2028-11-05 14:30:00', 1, 5),
    ('2028-11-08 14:30:00', '2028-11-09 14:30:00', 2, 5),
    ('2028-11-08 14:30:00', '2028-11-09 14:30:00', 1, 5),
    ('2028-11-10 14:30:00', '2028-11-10 14:30:00', 2, 5),
    ('2028-11-10 14:30:00', '2028-11-10 14:30:00', 1, 5);

    INSERT INTO user_has_event (user_id, event_id)
VALUES
    (1, 1),
    (1, 2),
    (1, 3),
    (1, 4),
    (1, 5),
    (2, 1),
    (2, 2),
    (2, 3),
    (2, 4),
    (2, 5);

INSERT INTO eventdate (start_date, end_date, event_id)
VALUES
    ('2023-11-01 09:00:00', '2023-11-01 17:00:00', 1),
    ('2025-11-05 14:30:00', '2025-11-29 18:00:00', 2),
    ('2026-11-05 14:30:00', '2026-11-29 18:00:00', 3),
    ('2027-11-05 14:30:00', '2027-11-29 18:00:00', 4),
    ('2028-11-05 14:30:00', '2028-11-29 18:00:00', 5);
    
COMMIT;
