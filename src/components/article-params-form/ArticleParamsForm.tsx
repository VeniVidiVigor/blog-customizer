import { clsx } from 'clsx';
import { useState, useRef } from 'react';
import {
  defaultArticleState,
  fontFamilyOptions,
  fontSizeOptions,
} from 'src/constants/articleProps';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { Text } from 'src/ui/text';

import styles from './ArticleParamsForm.module.scss';

export const ArticleParamsForm = (): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const [formState, setFormState] = useState(defaultArticleState);

  useOutsideClickClose({
    isOpen,
    rootRef,
    onChange: setIsOpen,
  });

  return (
    <div ref={rootRef}>
      <ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      <aside className={clsx(styles.container, { [styles.container_open]: isOpen })}>
        <form className={styles.form}>
          <div>
            <Text as="h2" size={31} weight={800} uppercase>
              Задайте параметры
            </Text>
          </div>
          <div>
            <Select
              onChange={(option) =>
                setFormState({ ...formState, fontFamilyOption: option })
              }
              selected={formState.fontFamilyOption}
              options={fontFamilyOptions}
              title="Шрифт"
            />
          </div>
          <div>
            <RadioGroup
              selected={formState.fontSizeOption}
              name="fontSize"
              onChange={(option) =>
                setFormState({ ...formState, fontSizeOption: option })
              }
              options={fontSizeOptions}
              title="Размер шрифта"
            />
          </div>
          <div className={styles.bottomContainer}>
            <Button title="Сбросить" htmlType="reset" type="clear" />
            <Button title="Применить" htmlType="submit" type="apply" />
          </div>
        </form>
      </aside>
    </div>
  );
};
