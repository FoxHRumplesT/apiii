import { HttpException, HttpStatus } from '@nestjs/common';
import { google } from 'googleapis';
import * as nodemailer from 'nodemailer';
import * as Dto from '../dto';

const SendEmail = async (message: Dto.SendEmailDto): Promise<string> => {
  const oAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
  );
  oAuth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN
  });
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'tech@monti.com.es',
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken
      }
    });
    const mailOptions = {
      from: 'Hola <tech@monti.com.es>',
      to: message.emails.join(),
      subject: message.subject,
      text: message.description,
      html: message.html
    }
    transport.sendMail(mailOptions);
    return 'Message success';
  } catch (error) {
    console.error('SEND_MESSAGE_ERROR', error);
    throw new HttpException({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      error: 'Internal server error',
    }, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

export default SendEmail;
