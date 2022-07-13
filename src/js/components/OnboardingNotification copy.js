import {html} from "htm/preact";
import {translate as t} from "../Translation";
import Identicon from "./Identicon";
import FollowButton from "./FollowButton";
import Session from "../Session";
import CopyButton from "./CopyButton";
import Helpers from "../Helpers";
import Component from "../BaseComponent";
import State from "../State";

const SUGGESTED_FOLLOW = 'copqEkzu3hmv1jM0xUOY_OyzIiJ33ihdqMQZMw5xRk0.ZUVZMvyyNoGl_Qbhr5gxDQV1NBRZGPy7UD3B9mk0DDA';

export default class OnboardingNotification extends Component {
  componentDidMount() {
    State.local.get('noFollowers').on(this.inject());
    State.local.get('noFollows').on(this.inject());
  }

  render() {
    if (this.state.noFollows) {
      return html`
        <div class="msg">
          <div class="msg-content">
            <p>${t('follow_someone_info')}</p>
            <div class="profile-link-container">
              <a href="/profile/${SUGGESTED_FOLLOW}" class="profile-link">
                <${Identicon} str=${SUGGESTED_FOLLOW} width=40 />
                <iris-text path="profile/name" user=${SUGGESTED_FOLLOW} placeholder="Suggested follow"/>
              </a>
              <${FollowButton} id=${SUGGESTED_FOLLOW} />
            </div>
            <p>${t('alternatively')} <a href="/profile/${Session.getPubKey()}">${t('give_your_profile_link_to_someone')}</a>.</p>
          </div>
        </div>
      `
    }
    if (this.state.noFollowers) {
      return html`
        <div class="msg">
          <div class="msg-content">
            <p>${t('no_followers_yet')}</p>
            <p><${CopyButton} text=${t('copy_link')} copyStr=${Helpers.getProfileLink(Session.getPubKey())}/></p>
            <p dangerouslySetInnerHTML=${{
                __html: t(
                  'alternatively_get_sms_verified',
                  `href="https://iris-sms-auth.herokuapp.com/?pub=${Session.getPubKey()}"`
                )}}>
            </p>
            <small>${t('no_followers_yet_info')}</small>
          </div>
        </div>
      `;
    }
    return '';
  }
}