import Debug from 'debug';
import EventDatamapper from '../models/event.dataMapper.js';
import UserDataMapper from '../models/user.dataMapper.js';
import UserHasEventDataMapper from '../models/userHasEvent.dataMapper.js';
import mailService from '../services/mailer/inviteLink.mailer.js';
import mailServiceRegistered from '../services/mailer/inviteLinkRegistered.mailer.js';

const debug = Debug('WeekAway:controller:eventLink');

const userHasEventDataMapper = new UserHasEventDataMapper();
const userDataMapper = new UserDataMapper();
const eventDatamapper = new EventDatamapper();

/**
 * @typedef {object} createEventLink
 * @property {integer} eventId
 * @property {integer} id
 */

/**
 * @typedef {object} joinEvent
 * @property {string} password
 * @property {integer} id
 */

export default {
  async createInviteLink(req, res) {
    const { email, eventId } = req.body;

    const userExist = await userDataMapper.findByEmail(email);
    const event = await eventDatamapper.findEventWithOwnerInfos(eventId);
    if (!event) {
      return res.json({ message: 'Evènement non existant' });
    }
    const ownerInfos = { firstname: event.firstname, lastname: event.lastname };
    if (!userExist) {
      mailService.sendMail(ownerInfos, event, email);
      return res.json({
        message:
          'Utilisateur non inscrit, l’invitation a été envoyée avec une demande de création de compte.',
      });
    }
    mailServiceRegistered.sendMail(userExist, ownerInfos, event, email);
    return res.json({
      message:
        "Utilisateur existant, l’invitation à l'événement a été envoyée.",
    });
  },

  async joinEvent(req, res) {
    const { password, user } = req.body;
    const userInformation = await userDataMapper.findById(user);
    if (!userInformation) {
      return res.json({ message: 'Utilisateur Inconnu' });
    }
    const event = await eventDatamapper.findEventByPassword(password);
    if (!event) {
      return res.json({
        message: 'Mot de passe incorrect ou événement inexistant',
      });
    }
    const userIsInEvent = await userHasEventDataMapper.verifyUserInEvent(
      userInformation.id,
      event.id,
    );
    if (!userIsInEvent) {
      const addtoevent = await userHasEventDataMapper.addUserToEvent(
        userInformation.id,
        event.id,
      );

      return res.json({
        event: event,
        message: `${userInformation.firstname} ${userInformation.lastname} ajouté à l'évènement ${event.name}`,
      });
    }

    return res.json({ message: "Utilisateur déjà dans l'évènement" });
  },
};
