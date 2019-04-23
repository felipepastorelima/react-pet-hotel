const { i18n } = require('../i18n');
const config = require('../../config/index')();

module.exports = class BookingUpdateEmail {
  constructor(language, booking) {
    this.language = language;
    this.to = booking.owner.email;
    this.booking = booking;
  }

  get subject() {
    return i18n(
      this.language,
      'emails.bookingUpdate.subject',
      i18n(this.language, 'app.title'),
      this.petName,
    );
  }

  get html() {
    const appTitle = i18n(this.language, 'app.title');

    return i18n(
      this.language,
      'emails.bookingUpdate.body',
      appTitle,
      this.petName,
      this.employeeNotes,
      this.imageRows,
      this.link,
    );
  }

  get imageRows() {
    const { photos } = this.booking;

    if (!photos || !photos.length) {
      return '';
    }

    let rows = [];

    for (let i = 0; i < photos.length; i += 2) {
      const photo1 = photos[i];
      const photo2 =
        photos.length > i + 1 ? photos[i + 1] : null;

      const photo1Td = i18n(
        this.language,
        'emails.bookingUpdate.imageTd',
        photo1.publicUrl,
      );
      const photo2Td = photo2
        ? i18n(
            this.language,
            'emails.bookingUpdate.imageTd',
            photo2.publicUrl,
          )
        : '';

      const twoImagesTr = i18n(
        this.language,
        'emails.bookingUpdate.twoImagesTr',
        photo1Td,
        photo2Td,
      );

      rows.push(twoImagesTr);
    }

    return rows.join('\n');
  }

  get link() {
    return `${config.clientUrl}/booking/${this.booking.id}`;
  }

  get employeeNotes() {
    return (this.booking.employeeNotes || '').replace(
      /\n/g,
      '<br/>',
    );
  }

  get petName() {
    return this.booking.pet.name;
  }
};
