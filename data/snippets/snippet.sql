SELECT DISTINCT person_name
FROM party_attendees
JOIN dog_owners ON party_attendees.person_id = dog_owners.owner_id
WHERE party_attendees.event_name = 'Who Let The Dogs Out Party'
  AND party_attendees.action = 'Let the dogs out';
