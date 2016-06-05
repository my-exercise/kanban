import assert from 'assert';
import NoteActions from '../app/actions/NoteActions';
import NoteStore from '../app/stores/NoteStore';
import alt from '../app/libs/alt';

describe('NoteStore', () => {
    beforeEach(() => {
       alt.flush();
    });

    it('creates notes', () => {
       const task = 'test';

        NoteActions.create({task});

        const state = NoteStore.getState();

        assert.equal(state.notes.length, 1);
        assert.equal(state.notes[0].task, task);
    });

    it('updates notes', () => {
        const task = 'test';
        const updatedTask = 'test 2';

        NoteActions.create({task});

        const note = NoteStore.getState().notes[0];

        NoteActions.update({...note, task: updatedTask});

        const state = NoteStore.getState();

        assert.equal(state.notes.length, 1);
        assert.equal(state.notes[0].task, updatedTask);
    });
});