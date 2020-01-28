import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Form } from 'semantic-ui-react';
import { defineMessages, injectIntl } from 'react-intl';
import Select from 'react-select';

import { blocks } from '~/config';
import { compose } from 'redux';
import withObjectBrowser from '@plone/volto/components/manage/Sidebar/ObjectBrowser';

import {
  customSelectStyles,
  selectTheme,
  DropdownIndicator,
  Option,
} from '@plone/volto/components/manage/Blocks/Listing/QuerystringWidget';

const messages = defineMessages({
  Template: {
    id: 'Template',
    defaultMessage: 'Template',
  },
});

const TemplateWidget = ({
  data,
  block,
  onChangeBlock,
  required = false,
  intl,
}) => {
  const templatesConfig = blocks?.blocksConfig?.listing?.templates;
  let value = data.template || 'default';

  if (templatesConfig && Object.keys(templatesConfig).length > 1) {
    return (
      <Form.Field inline required={true} id="field-template">
        <Grid>
          <Grid.Row stretched>
            <Grid.Column width="4">
              <div className="wrapper">
                <label htmlFor="select-listingblock-template">
                  {intl.formatMessage(messages.Template)}
                </label>
              </div>
            </Grid.Column>
            <Grid.Column width="8">
              <Select
                id="select-listingblock-template"
                name="select-listingblock-template"
                className="react-select-container"
                classNamePrefix="react-select"
                options={Object.keys(templatesConfig).map(key => {
                  return {
                    value: key,
                    ...templatesConfig[key],
                  };
                })}
                styles={customSelectStyles}
                theme={selectTheme}
                components={{ DropdownIndicator, Option }}
                value={{
                  value: value,
                  label: templatesConfig[value].label,
                }}
                onChange={field => {
                  onChangeBlock(block, {
                    ...data,
                    template: field.value,
                  });
                }}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form.Field>
    );
  }

  return <></>;
};

TemplateWidget.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  block: PropTypes.string.isRequired,
  onChangeBlock: PropTypes.func.isRequired,
  openObjectBrowser: PropTypes.func.isRequired,
};

export default compose(withObjectBrowser, injectIntl)(TemplateWidget);