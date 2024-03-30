import Debug from 'debug';
import EventDataMapper from '../models/event.dataMapper.js';
import EventDateDataMapper from '../models/eventDate.dataMapper.js';
import UserHasEventDataMapper from '../models/userHasEvent.dataMapper.js';
import dateOneEvent from '../services/dataDateOneEvent.service.js';
import dateVerify from '../services/dateVerify.service.js';
import randomId from '../services/randomId.service.js';

const debug = Debug('WeekAway:controller:event');
/**
 * @typedef {object} EventInput
 * @property {string} name
 * @property {integer} ownerId
 * @property {boolean} status
 * @property {string} description
 */

const datamapper = new EventDataMapper();
const userHasEventDataMapper = new UserHasEventDataMapper();
const eventDateDataMapper = new EventDateDataMapper();

export default {
  async findAllEvents(req, res) {
    const events = await datamapper.findAll();
    res.json(events);
  },

  async findEventById(req, res) {
    const { id } = req.params;
    const eventDetails = await datamapper.findEventById(id);

    const eventDetail = {};
    eventDetail.id = eventDetails.id;
    eventDetail.name = eventDetails.name;
    eventDetail.theme = eventDetails.theme;
    eventDetail.owner_id = eventDetails.owner_id;
    eventDetail.status = eventDetails.status;
    eventDetail.description = eventDetails.description;
    eventDetail.picture = eventDetails.picture;
    eventDetail.password = eventDetails.password;
    eventDetail.dates_of_event = eventDetails.dates_of_event;

    if (!eventDetails.users.includes(null)) {
      const eventDatereport = await dateOneEvent.choiceDateOneEvent(
        eventDetails,
      );

      const mergedToRenderEventDetails = {
        ...eventDetail,
        ...eventDatereport,
      };
      return res.json({ mergedToRenderEventDetails });
    }
    return res.json({ eventDetail });
  },

  async createEvent(req, res) {
    const password = randomId.makeId(5);
    const data = req.body;
    let eventDates = null;
    if (data.datesOfEvent !== undefined && data.datesOfEvent !== null) {
      eventDates = data.datesOfEvent;
    }
    if (data.startDate && data.endDate) {
      eventDates = {
        start_date: data.startDate,
        end_date: data.endDate,
      };
    }

    const dataEvent = {
      name: data.name,
      theme: data.theme,
      owner_id: data.owner_id,
      status: data.status,
      description: data.description,
      picture: data.picture,
      password,
    };

    // If someone upload a picture, we add the path to the data
    if (!req.file) {
      dataEvent.picture = 'http://localhost:3000/static/default.webp';
    } else if (req.file) {
      dataEvent.picture = `http://localhost:3000/static/${req.file.filename}`;
    }

    const event = await datamapper.createEvent(dataEvent);
    if (eventDates !== undefined && eventDates !== null) {
      if (eventDates.date === undefined && eventDates.date === null) {
        const eventDateNoDuplicate =
          dateVerify.removeDuplicateDates(eventDates);
        await eventDateDataMapper.createEventDateWithMultipleEvent(
          event.id,
          eventDateNoDuplicate,
        );
      } else {
        await eventDateDataMapper.createEventDate(event.id, eventDates);
      }
    }
    await userHasEventDataMapper.addUserToEvent(dataEvent.owner_id, event.id);
    res.json(event);
  },

  async updateEvent(req, res) {
    const { id } = req.params;
    const data = req.body;
    const baseData = await datamapper.findEventById(id);

    if (!baseData) {
      return res.json('Event not found');
    }
    const dataToUpdate = [
      'name',
      'owner_id',
      'status',
      'description',
      'picture',
      'theme',
    ];
    dataToUpdate.forEach((element) => {
      if (!data[element]) {
        data[element] = baseData[element];
      }
    });
    const event = await datamapper.updateEvent(id, data);
    return res.json(event);
  },

  async deleteEvent(req, res) {
    const { id } = req.params;
    const event = await datamapper.deleteEvent(id);
    res.json(event);
  },

  async findEventByPassword(req, res) {
    const { password } = req.body;
    const event = await datamapper.findEventByPassword(password);
    res.json(event);
  },
};
